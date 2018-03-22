TripsShowCtrl.$inject = ['$auth','Trip', '$scope', '$state', 'searchService', '$rootScope', 'directionsService', 'currentTripService'];

function TripsShowCtrl($auth, Trip, $scope, $state, searchService, $rootScope, directionsService, currentTripService) {
  const vm = this; //ViewModel - allows us to use this in function
  vm.currentTrip = {};
  vm.searchCat = 'museum';
  vm.today = new Date().toISOString();

  //need to store wether user is authenticated or not in order to test it in view and hide/show buttons accordingly.
  vm.isAuthenticated = $auth.isAuthenticated;
  vm.searchResults = [];
  vm.showDailyPlan = $state.params.showDailyPlan;

  $rootScope.$on('map:set', () => {
    Trip.findById($state.params.id)
      .then(trip => {
        vm.currentTrip = trip.data;
        search(); //run a search
        directions(); //draw directions
        currentTripService.set(vm.currentTrip);
        $rootScope.$broadcast('trip:set');
        search();
      });
  });

  // directions variables
  vm.directionInstructions = {};
  let waypts = [];
  let origin = {location: {lat: 0,lng: 0}};
  let destination = {location: {lat: 0,lng: 0}};


  function search() {
    searchService.nearby({
      location: vm.currentTrip.coordinates,
      radius: '1000',
      type: [vm.searchCat]
    })
      .then(results => vm.searchResults = results);
  }

  function directions() {
    const nbPlaces = vm.currentTrip.days[0].places.length;
    if (nbPlaces < 2) {
      directionsService.clearMap();
      return false;
    }
    origin.location = vm.currentTrip.days[0].places[0].location;
    destination.location = vm.currentTrip.days[0].places[nbPlaces - 1].location;

    //Cannot do a map as I only want to start at index 1 until n -2
    if(nbPlaces > 2){
      for (let i = 1; i < nbPlaces - 1 ; i++){
        waypts.push({
          location: vm.currentTrip.days[0].places[i].location,
          stopover: true
        });
      }
    }

    directionsService.drawDirections({
      origin: origin,
      destination: destination,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'WALKING'
    })
      .then(directions => {
        console.log('direction',directions); //used for walking directions
        vm.directionInstructions = directions;
      });
  }

  //changes the search category on google places
  function changeCat(category){
    vm.searchCat = category;
    search();
  }

  function tripContains(place) {
    return vm.currentTrip.days[0].places.find(element => element.googleId === place.place_id);
  }

  //function to add a place to the trip -
  function addPlaceTrip(place){
    Trip.createPlace(vm.currentTrip, place)
      .then(trip => {
        vm.currentTrip = trip.data;
        currentTripService.set(vm.currentTrip);
      })
      .then(() => {
        directions();
      });
  }


  //function to remove a place from the trip
  function removePlaceTrip(place){
    Trip.deletePlace(vm.currentTrip, place)
      .then(trip => {
        vm.currentTrip = trip.data;
        currentTripService.set(vm.currentTrip);
      }) //currentTrip is also updated through a broadcast...
      .then(() => {
        directions();
      });
  }

  $scope.$watch(() => $state.params, () => vm.showDailyPlan = $state.params.showDailyPlan === 'true', true);


  // vm.createTrip = createTrip;
  vm.changeCat = changeCat;
  vm.addPlaceTrip = addPlaceTrip;
  vm.removePlaceTrip = removePlaceTrip;
  vm.tripContains = tripContains;
  vm.directions = directions;

}

export default TripsShowCtrl;
