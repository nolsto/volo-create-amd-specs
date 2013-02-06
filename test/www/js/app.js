var config = {
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        templates: '../../templates'
    },
    hbs: {
        disableI18n : true
    }
};

requirejs.config(config);
requirejs(['app/main']);
