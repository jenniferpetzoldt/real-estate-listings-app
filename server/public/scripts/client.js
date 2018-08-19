let myApp = angular.module('myApp', ['ngRoute']);

// Configuring routes to views
myApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController as hc'
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

myApp.controller('HomeController', function ($http){
    const vm = this;
    console.log('NG in home');
    vm.addListing = function(listingToAdd) {
        console.log('adding listing to server', listingToAdd);
        $http({
            method: 'POST',
            url: '/listings',
            data: listingToAdd
        }).then(function(response){
            console.log('response from POST', response);
        }).catch(function(error){
            console.log('POST error', error);
        });
    };// end vm.addListing
    
});// end HomeController

myApp.controller('ListingsController', function ($http){
    const vm = this;
    vm.listings = [];
    console.log('NG in listings');
    vm.getListings = function(){
        $http({
            method: 'GET',
            url: '/listings/forsale'
        }).then(function(response){
            let data = response.data;
            console.log('ListingsController - getListings -response ', response.data);
            vm.listings = data.results;
        }).catch(function(error){
            console.log('ListingsController - getListings - error', error);
        });
    };// end getListings
});// end ListingsController

myApp.controller('RentalsController', function ($http){
    const vm = this;
    vm.rentals = [];
    console.log('NG in rentals');
    vm.getRentals = function(){
        $http({
            method: 'GET',
            url: '/listings/forrent'
        }).then(function(response){
            let data = response.data;
            console.log('ListingsController - getRentals -response ', response.data);
            vm.rentals = data.results;
        }).catch(function(error){
            console.log('ListingsController - getRentals - error', error);
        });
    };// end getListings
});// end RentalsController