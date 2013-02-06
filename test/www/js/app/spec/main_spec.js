define(function (require) {
    var app = require('../main');

    describe('Application', function () {

        it('should load', function () {
            expect(app).to.equal('app/main');
        });
    });
});
