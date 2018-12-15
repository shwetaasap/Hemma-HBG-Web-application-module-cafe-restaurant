   
var app = angular.module("GRASSPApp",['ngRoute','firebase']);
var cafeHelsingborg = angular.module("cafeApp",['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:'template/homess.html',
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
    .when('/cafe-map/:coordinate_noBracket', {
        templateUrl: 'template/cafeSearch-map.html',
        controller: 'cafeSearchMapCtrl'
    }) 
    .when('/restaurants_select', {
        templateUrl: 'template/restaurants_select.html',
        controller: 'restaurantServiceCtrl'
    }) 
    .when('/restaurant-map/:coordinate_noBracket', {
        templateUrl:'template/restaurant_search_map.html',
        controller: 'restaurantMapCtrl'
    });
});








