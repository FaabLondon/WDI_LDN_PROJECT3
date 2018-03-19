TripsIndexCtrl.$inject = ['$auth','Trip', '$state'];

function TripsIndexCtrl($auth, Trip, $state) {

  const vm = this; //ViewModel allows us to use this in function
  vm.isActive = true;
  vm.searchResult = [];
  vm.newTrip = {};
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
        Trip.currentTrip = res.data;
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


  function addPlaceTrip(place){
    const newPlace = {
      location: {
        lat: 0,
        lng: 0
      }
    };
    //update and format newPlace that will be added to trip


    if(!vm.currentTrip.days[0].places.find(element => {
      return element.googleId === place.place_id;
    })){
      newPlace.name = place.name;
      newPlace.address = place.vicinity; //check if formatted address exists
      newPlace.location.lat = place.geometry.location.lat();
      newPlace.location.lng = place.geometry.location.lng();
      newPlace.image = place.pictures;
      newPlace.description = '';
      newPlace.rating = place.rating;
      newPlace.googleId = place.place_id;
      // add it to the trip
      Trip.createPlaceTrip(newPlace)
        .then(res => {
          Trip.currentTrip = res.data;
          vm.currentTrip = res.data;
        });
    }
  }

  function removePlaceTrip(googlePlace){
    // if(vm.currentTrip.days[0].places.find(element => {
    //   return element. === place.place_id;
    // })){



    Trip.deletePlaceTrip(googlePlace)
      .then(res => {
        Trip.currentTrip = res.data;
        vm.currentTrip = res.data;
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


  this.createTrip = createTrip;
  vm.logout = logout;
  //not working
  vm.changeCat = changeCat;
  vm.addPlaceTrip = addPlaceTrip;
  vm.removePlaceTrip = removePlaceTrip;
  vm.hideNearbyPlaces = hideNearbyPlaces;


}

export default TripsIndexCtrl;
