var blocitoff = angular.module('blocitoff', ['firebase', 'ui-router']);

blocitoff.controller("Task.controller", ["$scope", "$firebaseArray", function($scope, $firebaseArray) {
    var ref = new Firebase("https://blocitoff5104.firebaseio.com");
    // download the data into a local object
    $scope.data = $firebaseArray(ref);

    }
]);