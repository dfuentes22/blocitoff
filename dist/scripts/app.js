// define our app and dependencies
var app = angular.module("blocitoff", ["ui.router", "firebase"]);

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
      
    // add taskList array to the scope to be used in our ng-repeat
    $scope.tasks = taskList;
    
    // Function to add new task
    $scope.addTask = function() {
        var newTask = {
            done: false,
            text: $scope.taskText
        };
        $scope.tasks.$add(newTask);
        
        $scope.taskText = '';
    };
    
    // Function to remove a task
    $scope.removeTask = function(start) {
        $scope.tasks.$remove(start, 1);
    };
    
    //Function to move a task
    $scope.move = function(index, direction) {
        //if moving up
        if (direction === "up") {
            if(index === 0) {
                return;    
            }
            index = index -1; 
        }
        //if moving down
        if(direction === "down"){
            if(index === $scope.tasks.length - 1){
                return;   
            }           
        }

        
        var task = $scope.tasks[index];
        $scope.tasks.splice(index + 2, 0, task);
        $scope.tasks.splice(index, 1);
            
    };
}]);


