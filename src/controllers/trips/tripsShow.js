TripsShowCtrl.$inject = ['$auth','Trip', '$state', 'searchService', '$rootScope'];

function TripsShowCtrl($auth, Trip, $state, searchService, $rootScope) {
  const vm = this; //ViewModel - allows us to use this in function
  vm.currentTrip = {};
  vm.searchCat = 'museum';

  vm.today = new Date().toISOString();

  //need to store wether user is authenticated or not in order to test it in view and hide/show buttons accordingly.
  vm.isAuthenticated = $auth.isAuthenticated;
  vm.searchResults = [];

  $rootScope.$on('map:set', () => {
    Trip.findById($state.params.id)
      .then(trip => {
        vm.currentTrip = trip.data;
        search();
      });
  });

  function search() {
    searchService.nearby({
      location: vm.currentTrip.coordinates,
      radius: '500',
      type: [vm.searchCat]
    })
      .then(results => vm.searchResults = results);
  }


  //changes the search category on google places
  function changeCat(category){
    console.log('changeCat', category);
    vm.searchCat = category;
    search();
  }

  function tripContains(place) {
    return vm.currentTrip.days[0].places.find(element => element.googleId === place.place_id);
  }

  //function to add a place to the trip -
  function addPlaceTrip(place){
    Trip.createPlace(vm.currentTrip, place)
      .then(trip => vm.currentTrip = trip.data);
  }

  //function to remove a place from the trip
  function removePlaceTrip(place){
    Trip.deletePlace(vm.currentTrip, place)
      .then(trip => vm.currentTrip = trip.data); //currentTrip is also updated through a broadcast...
  }

  // vm.createTrip = createTrip;
  vm.changeCat = changeCat;
  vm.addPlaceTrip = addPlaceTrip;
  vm.removePlaceTrip = removePlaceTrip;
  vm.tripContains = tripContains;

}

export default TripsShowCtrl;
