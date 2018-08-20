myApp.controller('HomeController', function ($http) {
    const vm = this;
    vm.types = ["rent", "sale"];
    vm.images = ["classic-flats,jpg", "haunted.png", "older.jpg", "rental.jpg", "rental2.jpg", "shiny.jpg", "stony.jpg"];
    console.log('NG in home');
    vm.addListing = function (listingToAdd) {
        console.log('adding listing to server', listingToAdd);
        $http({
            method: 'POST',
            url: '/listings',
            data: listingToAdd
        }).then(function (response) {
            console.log('response from POST', response);
            clearInputs();
        }).catch(function (error) {
            console.log('POST error', error);
        });
    };// end vm.addListing 

    function clearInputs(){
        vm.listingToAdd.cost = '';
        vm.listingToAdd.sqft = '';
        vm.listingToAdd.type = '';
        vm.listingToAdd.city = '';
        vm.listingToAdd.image_path = ''
    };

});// end HomeController