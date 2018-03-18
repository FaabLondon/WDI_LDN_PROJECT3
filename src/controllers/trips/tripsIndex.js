TripsIndexCtrl.$inject = ['$auth','Trip', '$state'];

function TripsIndexCtrl($auth, Trip, $state) {

  const vm = this; //ViewModel allows us to use this in function
  vm.isActive = true;
  vm.searchResult = [];
  vm.newTrip = {};
  vm.searchResult = [];
  vm.userName = '';
  vm.newTrip.days = [];
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
        vm.currentTrip = res.data;
        Trip.currentTrip = vm.currentTrip;
        console.log(Trip.tripId);
        $state.go('tripsIndex');
      });

    //this is the google search nearby search results
    console.log(Trip.searchResult);
    vm.searchResult = Trip.searchResult;

  }

  //not working
  function changeCat(category){
    vm.searchCat=category;
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


  this.createTrip = createTrip;
  vm.logout = logout;
  //not working
  vm.changeCat = changeCat;
  vm.hideNearbyPlaces = hideNearbyPlaces;

}

export default TripsIndexCtrl;
