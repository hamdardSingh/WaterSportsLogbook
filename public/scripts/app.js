'use strict';
/**
 * @ngdoc overview
 * @name openHelpApp
 * @description
 * # openHelpApp
 *
 * Main module of the application.
 */
angular
  .module('waterSportApp', [
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'ngHandsontable',
    'ngCookies'
  ])
  .config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {


    $urlRouterProvider.otherwise('/home');

    $stateProvider
    .state('index',{
       templateUrl:'views/index.html',
       url:'/home',
       controller:'homeController'
       })
  }]);
