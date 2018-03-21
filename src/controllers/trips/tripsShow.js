TripsShowCtrl.$inject = ['$auth','Trip', '$scope', '$state', 'searchService', '$rootScope', 'directionsService'];

function TripsShowCtrl($auth, Trip, $scope, $state, searchService, $rootScope, directionsService) {
  const vm = this; //ViewModel - allows us to use this in function
  vm.currentTrip = {};
  vm.searchCat = 'museum';
  vm.today = new Date().toISOString();

  //need to store wether user is authenticated or not in order to test it in view and hide/show buttons accordingly.
  vm.isAuthenticated = $auth.isAuthenticated;
  vm.searchResults = [];
  vm.showDailyPlan = $state.params.showDailyPlan;
  console.log('showdaily', vm.showDailyPlan);

  $rootScope.$on('map:set', () => {
    Trip.findById($state.params.id)
      .then(trip => {
        vm.currentTrip = trip.data;
        search();
      });
  });

  // directions variables
  vm.directions = {};
  const waypts = [];
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
    origin.location = vm.currentTrip.days[0].places[0].location;
    destination.location = vm.currentTrip.days[0].places[nbPlaces - 1].location;

    //Add each place to waypoints except for origin (1st element in array) and destination (last element of array)
    if(nbPlaces > 2){
      for (let i = 1; i < nbPlaces - 1; i++){
        waypts.push({
          location: vm.currentTrip.days[0].places[i].location,
          stopover: true
        });
      }
    } //else waypts stays [];

    directionsService.drawDirections({
      origin: origin,
      destination: destination,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'WALKING'
    })
      .then(directions => {
        console.log('direction',directions); //used for walking directions
        vm.directions = directions;
      });
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
      .then(trip => vm.currentTrip = trip.data)
      .then(() => directions());
  }


  //function to remove a place from the trip
  function removePlaceTrip(place){
    Trip.deletePlace(vm.currentTrip, place)
      .then(trip => vm.currentTrip = trip.data) //currentTrip is also updated through a broadcast...
      .then(() => directions());
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
