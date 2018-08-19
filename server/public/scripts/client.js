let myApp = angular.module('myApp', ['ngRoute']);

// Configuring routes to views
myApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home.html'
    }).when('/rentals', {
        templateUrl: 'views/rentals.html',
        controller: 'RentalsController as rc'
    }).when('/listings', {
        templateUrl: 'views/listings.html',
        controller: 'ListingsController as lc'
    }).otherwise({
        templateUrl: 'views/404.html'
    });
}); // end config