'use strict';

/**
 * @ngdoc overview
 * @name employeeManagementV20App
 * @description
 * # employeeManagementV20App
 *
 * Main module of the application.
 */
var myApp = angular
    .module('employeeManagementV20App', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap'
    ]);

myApp.config(function ($routeProvider) {
    $routeProvider
        /*.when('/', {
         templateUrl: 'views/main.html',
         controller: 'MainCtrl'
         })
         .when('/about', {
         templateUrl: 'views/about.html',
         controller: 'AboutCtrl'
         })*/
        .when('/', {
            templateUrl: 'views/loginPage.html',
            controller: 'loginPageCtrl'
        })
        .when('/createNewUser', {
            templateUrl: 'views/signUpPage.html',
            controller: 'loginPageCtrl'
        })
        .when('/userPage', {
            templateUrl: 'views/userPage.html',
            controller: 'loginPageCtrl'
        })
        .when('/addEmployee', {
            templateUrl: 'addEmployeeTemplate.html',
            controller: 'loginPageCtrl'
        })
        .when('/addProject', {
            templateUrl: 'addProjectTemplate.html',
            controller: 'loginPageCtrl'
        })
        .when('/addTechnology', {
            templateUrl: 'addTechnologyTemplate.html',
            controller: 'loginPageCtrl'
        })
        .when('/userAccount', {
            templateUrl: 'userAccountTemplate.html'
        })
        .when('/userSettings', {
            templateUrl: 'userSettingsTemplate.html'
        })
        .when('/userInfo', {
            templateUrl: 'userInfoTemplate.html'
        })

        .otherwise({redirectTo: '/'});

});

myApp.run(["$rootScope", "$log", "$location", function ($rootScope, $log, $location) {
    $rootScope.$on('$routeChangeStart', function (next, current) {

        $log.log("Route changed.", "$routeParams : ", $location.url());

        if ($location.url() == "/" && $rootScope.showUserName == true) {
            $location.path("/userPage");
        }

        if ($location.url() == "/userPage" && $rootScope.showUserName == false) {
            $location.path("/");
        }

    });
}]);
