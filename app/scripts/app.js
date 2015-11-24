// define our app and dependencies (remember to include firebase!)
var app = angular.module("blocitoff", ["firebase"]);

// this factory returns a synchronized array of chat messages
app.factory("taskList", ["$firebaseArray",
  function($firebaseArray) {
    // create a reference to the database location where we will store our data
    var ref = new Firebase("https://blocitoff5104.firebaseio.com/");

    // this uses AngularFire to create the synchronized array
    return $firebaseArray(ref);
  }
]);

app.controller("Task.controller", ["$scope", "taskList",
  // we pass our new chatMessages factory into the controller
  function($scope, taskList) {

    // we add chatMessages array to the scope to be used in our ng-repeat
    $scope.tasks = taskList;

    // a method to create new messages; called by ng-submit
    $scope.addTask = function() {
      // calling $add on a synchronized array is like Array.push(),
      // except that it saves the changes to our database!
      $scope.tasks.$add({
        content: $scope.task
      });

      // reset the message input
      $scope.task = "";
    };

    // if the messages are empty, add something for fun!
    $scope.tasks.$loaded(function() {
      if ($scope.tasks.length === 0) {
        $scope.tasks.$add({
          content: "Enter a task!"
        });
      }
    });
  }
]);

// breaking the program when I try ui-router
/*
blocitoff.config(function($stateProvider, $locationProvider) {
    
    $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
    });
    
    $stateProvider
        .state('task', {
            url: '/task',
            controller: 'Task.controller',
            templateUrl: '/templates/task.html'
        })
});*/