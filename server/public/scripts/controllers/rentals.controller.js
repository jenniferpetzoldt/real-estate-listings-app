myApp.controller('RentalsController', function ($http) {
    const vm = this;
    vm.rentals = [];
    console.log('NG in rentals');
    getRentals();

    function getRentals() {
        $http({
            method: 'GET',
            url: '/listings/for-rent'
        }).then(function (response) {
            console.log('ListingsController - getRentals -response ', response.data);
            vm.rentals = response.data;
        }).catch(function (error) {
            console.log('ListingsController - getRentals - error', error);
        });
    };// end getListings

    vm.deleteRental = function (rentalId) {
        $http({
            method: 'DELETE',
            url: '/listings/for-rent/' + rentalId
        }).then(function (response) {
            console.log('in deleteRental');
            getRentals();
        }).catch(function (error) {
            alert('unable to detete rental');
        });
    }// end deleteRental
});// end RentalsController