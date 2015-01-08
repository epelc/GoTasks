'use strict'

var taskControllers = angular.module('asc.taskControllers', [])

require('angular-resource/angular-resource')

var taskServices = angular.module('asc.taskServices', ['ngResource'])

require('app/task/list/taskListCtrl')
require('app/task/details/taskDetailsCtrl')


taskServices.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tasks', {
            url: '/',
            templateUrl: '/app/task/list/list.html',
            controller: 'taskListCtrl',
            ncyBreadcrumb: {
                label: 'Tasks'
            }
        })
        .state('tasks.details', {
            url: '/:Id',
            templateUrl: '/app/task/details/details.html',
            controller: 'taskDetailsCtrl',
            ncyBreadcrumb: {
                label: 'Details {{currentTask.Id}}'
            }
        })
})

taskServices.service('Task', function($q) {
    var _self = this
    this.tasks = []

    this.getTaskDetails = function(id) {
        var deferred = $q.defer()

        deferred.resolve(_self.tasks[id])

        return deferred.promise
    }

    this.getTasks = function() {
        var deferred = $q.defer()

        deferred.resolve(_self.tasks)

        return deferred.promise
    }

    this.addTask = function(task) {
        var deferred = $q.defer()

        _self.tasks.push(task)
        deferred.resolve(_self.tasks)

        return deferred.promise
    }

})
