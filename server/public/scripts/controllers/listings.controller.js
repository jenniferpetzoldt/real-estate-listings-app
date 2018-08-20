myApp.controller('ListingsController', function ($http) {
    const vm = this;
    vm.listings = [];
    console.log('NG in listings');
    getListings();

    function getListings() {
        $http({
            method: 'GET',
            url: '/listings/for-sale'
        }).then(function (response) {
            console.log('ListingsController - getListings -response ', response.data);
            vm.listings = response.data;
            vm.listings.cost = 
            console.log(vm.listings);
        }).catch(function (error) {
            console.log('ListingsController - getListings - error', error);
        });
    };// end getListings

    vm.deleteListing = function (listingId) {
        $http({
            method: 'DELETE',
            url: '/listings/for-sale/' + listingId
        }).then(function (response) {
            console.log('in deleteListing');
            getListings();
        }).catch(function (error) {
            alert('unable to delete listing');
        });
    }// end deleteListing
});// end ListingsController