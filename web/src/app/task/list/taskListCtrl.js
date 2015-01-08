'use strict'

angular.module('asc.taskControllers')
    .controller('taskListCtrl', function($scope, $state, Task) {
        $scope.Tasks = [{
            Title: "Get er done",
            Description: "Where is that from?",
            Complete: false
        }, {
            Title: "Add some more tasks",
            Description: "We need alot of them",
            Complete: true
        }, {
            Title: "Make the add task btn work",
            Description: "That'd be nice wouldn't it? I think a dialog would work perfectly for this.",
            Complete: false
        }, {
            Title: "Finish implementing the task details",
            Description: "Also find out what to put in there? May make this description have an ellipse when it's really long",
            Complete: false
        }, {
            Title: "Persist tasks to local storage/backend w/ mongodb",
            Description: "Which will we choose? Easy and simple local storage or mongodb?",
            Complete: false
        }]

        console.log('Task list')
    })
