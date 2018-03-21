TripsIndexCtrl.$inject = ['$auth','Trip', '$state', '$scope', '$rootScope', '$sce'];

function TripsIndexCtrl($auth, Trip, $state, $scope, $rootScope, $sce) {
  const vm = this; //ViewModel - allows us to use this in function
  vm.isActive = true;
  vm.searchResult = [];
  vm.newTrip = {};
  vm.userName = '';
  vm.newTrip.days = [];
  //$scope.currentTrip = {};
  vm.currentTrip = {};
  vm.allUsersTrips = [];
  vm.coordinates = {
    lat: 0,
    lng: 0
  };
  vm.address;
  vm.instructionsDay = '';
  //not working
  vm.searchCat='museum';
  vm.addButton1 = '+';
  vm.addButton2;

  vm.today = new Date().toISOString();

  //need to store wether user is authenticated or not in order to test it in view and hide/show buttons accordingly.
  vm.isAuthenticated = $auth.isAuthenticated;
  vm.userName = Trip.userName;

  //create trip function
  function createTrip() {
    const start = vm.newTrip.startDate;

    if(vm.form.$invalid) return false;
    vm.isActive = !vm.isActive;

    //vm.newTrip.location = vm.address;
    //add array of day with 1st day = startDate of trip
    vm.newTrip.days[0] = {
      date: start,
      places: []
    };

    //user will be added to trip on server side
    //function returns trip and we store tripId to be able to send Ajax requests
    Trip.create(vm.newTrip)
      .then(res => {
        Trip.tripId = res.data._id;
        //$scope.currentTrip = res.data;
        vm.currentTrip = res.data;
        Trip.currentTrip = res.data;
        $state.go('tripsIndex');
      });

    //this is the google search nearby search results that updates Trip.searchResult in the directive and then updates vm.searchResult
    vm.searchResult = Trip.searchResult;

  }

  //changes the search category on google places
  function changeCat(category){
    vm.searchCat = category;
  }

  //function to add a place to the trip -
  function addPlaceTrip(place){

    //check that we are not adding a duplicate place in the trip
    if(!vm.currentTrip.days[0].places.find(element => {
      return element.googleId === place.place_id;
    })){
      Trip.createPlace(place);
      vm.currentTrip = Trip.currentTrip; //currentTrip is also updated through a broadcast...
    }
    if(place.addButton1 === '✓'){
      place.addButton1 = '+';
    } else {
      place.addButton1 = '✓';
    }
  }

  //function to remove a place from the trip
  function removePlaceTrip(googlePlace){
    Trip.deletePlaceTrip(googlePlace);
    vm.currentTrip = Trip.currentTrip; //currentTrip is also updated through a broadcast...
    if(googlePlace.addButton1 === '✓'){
      googlePlace.addButton1 = '+';
    } else {
      googlePlace.addButton1 = '✓';
    }
  }

  //function to display the directions in the dailyPLan
  $scope.$on('Directions updated', (e, directions) => {
    vm.displayDirections(directions);
  });

  function displayDirections(directions){
    const route = directions.routes[0];
    vm.instructionsDay = '';
    //loop through the geocode_waypoints to Object.assign detailed information for display in myTrip view
    directions.geocoded_waypoints.forEach(wayPt => {
    });

    //For each route, display summary information.
    for (let i = 0; i < route.legs.length; i++) {
      let routeSegment = i + 1;
      vm.instructionsDay += '<b> Step: ' + routeSegment + ' of your trip</b><br>';
      vm.instructionsDay += route.legs[i].start_address + ' to ';
      vm.instructionsDay += route.legs[i].end_address + '<br>';
      vm.instructionsDay += '<b> Distance: </b>' + route.legs[i].distance.text + '<br>';
      vm.instructionsDay += '<b> Duration: </b>' + route.legs[i].duration.text + '<br><br>';
      vm.instructionsDay = $sce.trustAsHtml(vm.instructionsDay);
    }
  }

  function seeAllTrips() {
    Trip.seeAllTrips()
      .then(res => {
        vm.allUsersTrips = res.data;
      //  Trip.allUsersTrips = res.data;
        $rootScope.$broadcast('All trips sent', res.data);
      });
  }

  // Hide nearby Places - not working
  function hideNearbyPlaces() {
    vm.showMe = !vm.showMe;
  }

  //logs the user out
  function logout(){
    $auth.logout(); //removes token from local storage
    $state.go('homepage');
  }

  //listening for events
  $scope.$on('trip updated', (e, data) => {
    vm.currentTrip = data;
  });

  $scope.$on('All search results updated', (e, data) => {
    console.log('received data for updated search:', data);
    vm.searchResult = data;
  });

  vm.createTrip = createTrip;
  vm.logout = logout;
  //not working
  vm.changeCat = changeCat;
  vm.addPlaceTrip = addPlaceTrip;
  vm.removePlaceTrip = removePlaceTrip;
  vm.hideNearbyPlaces = hideNearbyPlaces;
  vm.displayDirections = displayDirections;
  vm.seeAllTrips = seeAllTrips;

}

export default TripsIndexCtrl;
