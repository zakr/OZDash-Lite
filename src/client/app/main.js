require.config({
    waitSeconds: 30,
    paths: {
        vendor:"../vendor/js",
        angular: '../vendor/js/angular',
        ngRoute:'../vendor/js/angular-route',
        controllers:"controllers/",
        partials:"partials/",
        filters:'filters/',
        directives:'directives/',
        services:'services/',
        routes:'routes/routes'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'ngRoute':{
            deps:['angular'],
            exports:'ngRoute'
        }
    }
});

//start our app once the dom is ready
require(['vendor/requirejs-domready!','app','routes'], function (document,$,app) {
  //init the application
  app.init();
});
