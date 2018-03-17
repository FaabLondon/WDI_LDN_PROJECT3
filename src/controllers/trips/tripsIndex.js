TripsIndexCtrl.$inject = ['Trip', '$state'];

function TripsIndexCtrl(Trip, $state) {

  const vm = this; //ViewModel allows us to use this in function
  vm.isActive = true;
  vm.newTrip = {};
  vm.newTrip.days = [];
  vm.coordinates = {
    lat: 0,
    lng: 0
  };
  vm.address;

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

  this.handleSubmit = handleSubmit;


}

export default TripsIndexCtrl;
