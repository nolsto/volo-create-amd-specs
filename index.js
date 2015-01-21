var fs = require('fs'),
    path = require('path'),
    _ = require('underscore');

// looks for .js modules ending in "_spec".
// excludes those modules beginning with "_".
var pattern = /\/[^_][^\/]*_spec.js$/,
    newline = '\n',
    tab = '    ';


function generateSpecsModule (specs) {
    var out = '';

    _.each(specs, function (spec) {
        out += tab + '\'' + spec + '\',' + newline;
    });
    return ['define([', out.slice(0, -2) ,']);'].join(newline);
}

module.exports = {
    summary: 'Collects unit test specs and compiles them as dependencies ' +
             'in an amd module.',

    doc: fs.readFileSync(path.join(__dirname, 'doc.md'), 'utf8'),

    validate: function (namedArgs, configPath) {
        if (!configPath) {
            return new Error('Please enter path to a requirejs config json');
        }
    },

    run: function (d, v, namedArgs, configPath, outputPath) {
        var file = path.resolve(path.join(v.path, configPath)),
            config = require(file),
            baseDir = path.resolve(path.join(path.dirname(file),
                                             // config.appDir,
                                             config.baseUrl)),
            specs = [],
            out = '';

        specs = _.map(_.extend({'': './'}, config.paths), function (val, key) {
            var pathDir = path.join(baseDir, val);
            var matches = v.getFilteredFileList(pathDir, pattern);

            return _.map(matches, function (match) {
                // replace folder path with module path and remove .js extension
                return path.join(key, path.relative(pathDir, match)).slice(0, -3);
            });
        });
        specs = _.chain(specs).flatten().uniq().value();

        try {
            v.write(path.join(v.path, outputPath), generateSpecsModule(specs));
            out = 'Collected ' + specs.length + ' specs to ' + outputPath
        } catch (err) {
            out = 'Found ' + specs.length + ' specs to collect:' + newline;
            _.each(specs, function (spec) {
                out += spec + newline;
            });
        } finally {
            d.resolve(out);
        }
    }
};
