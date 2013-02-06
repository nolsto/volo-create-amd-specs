requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        templates: '../../templates',
        specs: '../specs'
    },
    hbs: {
        disableI18n : true
    }
});

require(['specs'], function() {
    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }
});
