TripsNewCtrl.$inject = ['$auth','Trip', '$state', '$rootScope'];

function TripsNewCtrl($auth, Trip, $state, $rootScope) {
  const vm = this; //ViewModel - allows us to use this in function
  vm.newTrip = { coordinates: {} };

  vm.today = new Date();


  // validation for the date. Makes the button available to you if there is a location and the date is in the future. ng-disable in the view.
  function canCreateTrip() {
    return vm.newTrip.startDate && vm.newTrip.startDate > vm.today && vm.newTrip.location;
  }


  //create trip function
  function createTrip() {
    //add array of day with 1st day = startDate of trip
    vm.newTrip.days = [{
      date: vm.newTrip.startDate,
      places: []
    }];

    //user will be added to trip on server side
    //function returns trip and we store tripId to be able to send Ajax requests
    // If you look in the controller server side you can see what is being returned. In this case it is a trip, so res.data._id is our new trip id.
    Trip.create(vm.newTrip)
      .then(res => {
        $state.go('tripsShow', { id: res.data._id }); // This redirects to the showpage and sends the id so the url is show/trip_id. So you can access $state params in the front end router - url: trips/:id = res.data.id
      });
  }

  vm.canCreateTrip = canCreateTrip;
  vm.createTrip = createTrip;

}

export default TripsNewCtrl;
