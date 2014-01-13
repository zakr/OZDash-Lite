define(['angular','app'],function(angular, mainApp){
    'use strict';

    mainApp.controller('EnginesController' , ['$scope' , '$log' , function ($scope , $log) {
        $log.log("Engine Controllers running");
        $scope.title="Engines";
    }]);

});