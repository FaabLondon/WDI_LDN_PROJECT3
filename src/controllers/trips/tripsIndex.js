TripsIndexCtrl.$inject = ['$auth','Trip', '$state'];

function TripsIndexCtrl($auth, Trip, $state) {

  const vm = this; //ViewModel allows us to use this in function
  vm.isActive = true;
  vm.searchResult = [];
  vm.newTrip = {};
  vm.searchResult = [];
  vm.userName = '';
  vm.newTrip.days = [];
  vm.coordinates = {
    lat: 0,
    lng: 0
  };
  vm.address;

  //need to store wether user is authenticated or not in order to test it in view and hide/show buttons accordingly.
  vm.isAuthenticated = $auth.isAuthenticated;
  vm.userName = Trip.userName;

  //create trip function
  function handleSubmit() {
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
    //fucntion returns trip and we store tripId
    Trip.create(vm.newTrip)
      .then(trip => {
        Trip.tripId = trip._id;
        $state.go('tripsIndex');
      });

    //this is the google search nearby search results
    vm.searchResult = Trip.searchResult;
    // console.log(vm.searchResult);

  }

  //logs the user out
  function logout(){
    $auth.logout(); //removes token from local storage
    $state.go('homepage');
  }


  this.handleSubmit = handleSubmit;
  vm.logout = logout;

}

export default TripsIndexCtrl;
