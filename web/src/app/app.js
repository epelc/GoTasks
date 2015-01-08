'use strict'

console.info('Welcome to go-material', VERSION)

// Required for angular-material
require('angular-aria')
require('angular-animate')
require('material')

// angular imports
require('angular-ui-router/release/angular-ui-router')
require('angular-breadcrumb/dist/angular-breadcrumb')

require('app/task/taskServices')


var asc = angular.module('gomat', [
    'ngAnimate',
    'ui.router',
    'ngMaterial',
    'ncy-angular-breadcrumb',
    'asc.taskControllers',
    'asc.taskServices'
])

asc.config(function($locationProvider, $urlRouterProvider, $stateProvider, $mdThemingProvider, $breadcrumbProvider) {
    $mdThemingProvider.theme('default')
        .primaryColor('indigo')
        .accentColor('light-blue')

    $locationProvider.html5Mode(true)
    $urlRouterProvider.otherwise("/")

    // $stateProvider
    //     .state('app', {
    //         url: '/',
    //         abstract: true,
    //         ncyBreadcrumb: {
    //             label: 'Gomado'
    //         }
    //     })

    $breadcrumbProvider.setOptions({
        templateUrl: '/app/material-breadcrumbs.html'
    })
})

asc.run(function($rootScope) {
    // Set this so we can get it from html easily
    $rootScope.BUILDINFO = {
        version: VERSION,
        devMode: DEVMODE
    }
})
