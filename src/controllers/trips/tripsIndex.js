TripsIndexCtrl.$inject = ['$auth','Trip', '$state', '$scope'];

function TripsIndexCtrl($auth, Trip, $state, $scope) {
  const vm = this; //ViewModel - allows us to use this in function
  vm.isActive = true;
  vm.searchResult = [];
  vm.newTrip = {};
  vm.userName = '';
  vm.newTrip.days = [];
  //$scope.currentTrip = {};
  vm.currentTrip = {};
  vm.coordinates = {
    lat: 0,
    lng: 0
  };
  vm.address;
  //not working
  vm.searchCat='point_of_interest';

  //need to store wether user is authenticated or not in order to test it in view and hide/show buttons accordingly.
  vm.isAuthenticated = $auth.isAuthenticated;
  vm.userName = Trip.userName;

  //create trip function
  function createTrip() {
    const start = vm.newTrip.startDate;

    if(vm.form.$invalid) return false;
    vm.isActive = !vm.isActive;

    vm.newTrip.location = vm.address;
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

    //this is the google search nearby search results which updates Trip.searchResult
    console.log(Trip.searchResult);
    vm.searchResult = Trip.searchResult;

  }

  //not working
  function changeCat(category){
    vm.searchCat=category;
  }

  //function to add a place to the trip -
  //try to move to service as same code as in google-map directive, however I could not get vm.currentTrip to be updated in the controller from the service...
  //adding a scope.watch on Trip.currentTrip did not work.
  function addPlaceTrip(place){

    //check that we are not adding a duplicate place in the trip
    if(!vm.currentTrip.days[0].places.find(element => {
      return element.googleId === place.place_id;
    })){
      Trip.createPlace(place);
      //$scope.currentTrip = Trip.currentTrip;
      vm.currentTrip = Trip.currentTrip;
    }
  }

  //function to remive a place from the trip
  function removePlaceTrip(place){

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

  $scope.$on('trip updated', (e, data) => {
    console.log('received data:', data);
    vm.currentTrip = data;
  });


  vm.createTrip = createTrip;
  vm.logout = logout;
  //not working
  vm.changeCat = changeCat;
  vm.addPlaceTrip = addPlaceTrip;
  vm.removePlaceTrip = removePlaceTrip;
  vm.hideNearbyPlaces = hideNearbyPlaces;


}

export default TripsIndexCtrl;
