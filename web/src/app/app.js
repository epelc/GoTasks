'use strict'

console.info('Welcome to go-material', VERSION)

// Required for angular-material
require('angular-aria')
require('angular-animate')
require('material')

// angular imports
require('angular-ui-router/release/angular-ui-router')



var asc = angular.module('gomat', [
    'ngAnimate',
    'ui.router',
    'ngMaterial',
])

asc.config(function($locationProvider, $urlRouterProvider, $stateProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryColor('indigo')
        .accentColor('light-blue')

    $locationProvider.html5Mode(true)
    $urlRouterProvider.otherwise("/")

    $stateProvider
    // landing page
    // sends you to the app if your already logged in
        .state('home', {
            url: '/',
            templateUrl: '/app/landing/landing.html',
            controller: function($scope, $mdToast) {
                $scope.person = {}
                $scope.inspectPerson = function() {
                    $mdToast.show($mdToast.simple()
                        .content('Thank you for your submission.'))
                }
            }
        })
        // Some generl legal/about us pages
        .state('home.legal', {
            url: 'legal',
            abstract: true,
            template: '<h1>Legal</h1><div ui-view></div>'
        })
        .state('home.legal.tos', {
            url: '/tos',
            templateUrl: '/app/landing/legal/tos.html'
        })
        .state('home.legal.privacy', {
            url: '/privacy',
            templateUrl: '/app/landing/legal/privacy.html'
        })
        .state('home.about', {
            url: 'about',
            templateUrl: '/app/landing/about.html'
        })
})

asc.run(function($rootScope) {
    // Set this so we can get it from html easily
    $rootScope.BUILDINFO = {
        version: VERSION,
        devMode: DEVMODE
    }
})

asc.controller('menuCtrl', function($scope, $q, $mdSidenav, $state) {

    $scope.toggleMenu = function() {
        $mdSidenav('left').toggle()
    }

    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $mdSidenav('left').close()
    })
})
