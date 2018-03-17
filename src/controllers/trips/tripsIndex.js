TripsIndexCtrl.$inject = ['Trip'];

function TripsIndexCtrl(Trip) {

  const vm = this; //ViewModel allows us to use this in function
  vm.isActive = true;
  vm.newTrip = {};
  vm.locationName = '';
  vm.newPlace = {};
  vm.coordinates = {
    lat: 0,
    lng: 0
  };

  function handleSubmit() {
    if(vm.form.$invalid) return false;
    vm.isActive = !vm.isActive;
    console.log(vm.newPlace);
    console.log(vm.newPlace.location);
    console.log(vm.newPlace.startDate);
    //add user and array of 1 day with day = startDate
    
    console.log(vm.coordinates);

  }


  this.handleSubmit = handleSubmit;


}

export default TripsIndexCtrl;
