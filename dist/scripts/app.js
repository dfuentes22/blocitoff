// define our app and dependencies
var app = angular.module("blocitoff", ["firebase", "ui.router"]);

app.config(function($stateProvider, $locationProvider) {
    
    $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
    });
    
    $stateProvider
        .state('task', {
            url: '/',
            controller: 'Task.controller',
            templateUrl: '/templates/task.html'
        })
});

// this factory returns a synchronized array of tasks
app.factory("taskList", ["$firebaseArray",
  function($firebaseArray) {
    // create a reference to the database location where we will store our data
    var ref = new Firebase("https://blocitoff5104.firebaseio.com/");

    // this uses AngularFire to create the synchronized array
    return $firebaseArray(ref);
  }
]);

app.controller("Task.controller", ["$scope", "taskList",
  // pass new taskList factory into the controller
  function($scope, taskList) {

    // we add taskList array to the scope to be used in our ng-repeat
    $scope.tasks = taskList;

    // a method to create new taks; called by ng-submit
    $scope.addTask = function() {
      // calling $add on a synchronized array is like Array.push(),
      // except that it saves the changes to our database!
      $scope.tasks.$add({
        content: $scope.task
      });

      // reset the task input
      $scope.task = "";
    };

    // if the messages are empty, do nothing
    $scope.tasks.$loaded(function() {
      if ($scope.tasks.length === 0) {
          return
      }
    });
  }
]);


