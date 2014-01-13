define(['app',
    "controllers/engines",
] , function (mainApp) {
    return mainApp.config(['$routeProvider' , function ($routeProvider) {
        $routeProvider
            .when('/' , {controller: 'EnginesController' , templateUrl: '/client/app/partials/engines.html'})
    }]);
});