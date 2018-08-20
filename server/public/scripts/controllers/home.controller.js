myApp.controller('HomeController', function ($http) {
    const vm = this;
    console.log('NG in home');
    vm.addListing = function (listingToAdd) {
        console.log('adding listing to server', listingToAdd);
        $http({
            method: 'POST',
            url: '/listings',
            data: listingToAdd
        }).then(function (response) {
            console.log('response from POST', response);
        }).catch(function (error) {
            console.log('POST error', error);
        });
    };// end vm.addListing   
});// end HomeController