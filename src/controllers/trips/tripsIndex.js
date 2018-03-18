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
    //function returns trip and we store tripId
    Trip.create(vm.newTrip)
      .then(res => {
        Trip.tripId = res.data._id;
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

  function addTrip(place){
    const newPlace = {
      location: {
        lat: 0,
        lng: 0
      }
    };
    // console.log(place);
    //update and format newPlace that will be added to trip
    newPlace.name = place.name;
    newPlace.address = place.vicinity; //check if formatted address exists
    newPlace.location.lat = place.geometry.location.lat();
    newPlace.location.lng = place.geometry.location.lng();
    newPlace.image = place.pictures;
    newPlace.description = '';
    newPlace.rating = place.rating;

    //add it to the trip
    // Trip.createPlaceTrip(newPlace)
    //   .then(res => {
    //     Trip.currentTrip = res.data;
    //   });
  }

  function removeTrip(place){

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

}

export default TripsIndexCtrl;
