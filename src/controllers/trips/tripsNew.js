TripsNewCtrl.$inject = ['$auth','Trip', '$state'];

function TripsNewCtrl($auth, Trip, $state) {
  const vm = this; //ViewModel - allows us to use this in function
  vm.newTrip = { coordinates: {} };

  vm.today = new Date().toISOString();

  //create trip function
  function createTrip() {
    if(vm.form.$invalid) return false;

    //add array of day with 1st day = startDate of trip
    vm.newTrip.days = [{
      date: vm.newTrip.startDate,
      places: []
    }];

    //user will be added to trip on server side
    //function returns trip and we store tripId to be able to send Ajax requests
    Trip.create(vm.newTrip)
      .then(res => $state.go('tripShow', { id: res.data._id }));

  }

  vm.createTrip = createTrip;

}

export default TripsNewCtrl;
