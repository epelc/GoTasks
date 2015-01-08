'use strict'

angular.module('asc.taskControllers')
    .controller('taskDetailsCtrl', function($scope, $state, Task) {
        $scope.Tasks = []

        console.log('Task details')

        // Check if we need to get the details
        // otherwise just calculate the best price
        if ($scope.$parent.currentTask == null) {
            //Set this so they dont have to wait to see it in the breadcrumb
            $scope.$parent.currentTask = {
                Id: $stateParams.Id
            }
            Task.getTaskDetails($stateParams.Id).then(function(data) {
                $scope.$parent.currentTask = data
                $scope.isLoadingDetails = false
            }, function(error) {
                if (error.data && error.data.Error) {
                    $scope.errorMsg = error.data.Error
                } else {
                    console.log('Error loading quote details:', error)
                    $scope.errorMsg = 'Unkown error'
                }
            })
        } else {
            $scope.isLoadingDetails = false
        }
    })
