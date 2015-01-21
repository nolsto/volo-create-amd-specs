## Summary

This is a [volo](https://github.com/volojs/volo) command that collects unit test
specs found in a RequireJS project structure and compiles them as dependencies
in an AMD module.

## Usage

    volo collect-amd-specs [-p] config.json output.js

where the valid flags are:

* p: print collected specs and do not write to output module.

## Examples

    > volo collect-amd-specs tools/test.json www/js/specs.js
    > Collected 2 specs to www/js/specs.js

Using without output file:

    > volo collect-amd-specs tools/test.json
    > Found 2 specs to collect:
    > app/spec/main_spec.js
    > app/util/common/spec/print_spec.js
