var app = angular.module("helsingborgApp",['ngRoute','firebase']);
var cafeHelsingborg = angular.module("cafeApp",['ngRoute']);



app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:'template/home.html',
        controller:'FirstController',  
    })
    .when('/sign-up',{
        templateUrl:'template/sign-up.html',
        controller:'SignUpController'
    })
    .when('/login',{
        templateUrl:'template/login.html',
        controller:'LogInController'
    }) 
    .when('/sign-in',{
        templateUrl:'template/sign-in.html',
        controller:'SignInController'
    })  
});

cafeHelsingborg.config(function($routeProvider){
    $routeProvider
    .when('/cafe',{
        templateUrl:'/cafe.html',
        controller:'cafeSearchCtrl'
    }) 
    .when('/cafes',{
        templateUrl:'template/cafes.html',
        controller:'cafeServiceCtrl'
    })
    .when('/cafe-map/:coordinates', {
        templateUrl: 'template/cafeSearch-map.html',
        controller: 'cafeSearchMapCtrl'
    }) 
});