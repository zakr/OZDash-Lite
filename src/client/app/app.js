define(['angular', 'ngRoute'], function (ng) {


    var app = ng.module('firstApp', ["ngRoute"]);

    app.init = function () {
        ng.bootstrap(document, ['firstApp']);
    };


    return app;


});
