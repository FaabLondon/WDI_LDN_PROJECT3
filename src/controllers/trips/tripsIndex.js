TripsIndexCtrl.$inject = ['$auth','Trip', '$state', '$http'];

function TripsIndexCtrl($auth, Trip, $state, $http) {

  const vm = this; //ViewModel allows us to use this in function
  vm.isActive = true;
  vm.newTrip = {};
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
    console.log(vm);
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
    Trip.create(vm.newTrip)
      .then(() => $state.go('tripsIndex'));

  }

  vm.all = {};
  $http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&key=AIzaSyAPEmf9_jhooXaFG-9VI-W1catLwZ5vGfg')
    .then(res => Object.assign(vm.all, res))
    .then(res => vm.all = res.data);

  console.log(vm.all);


  //logs the user out
  function logout(){
    $auth.logout(); //removes token from local storage
    $state.go('homepage');
  }

  this.handleSubmit = handleSubmit;
  vm.logout = logout;

}

export default TripsIndexCtrl;
