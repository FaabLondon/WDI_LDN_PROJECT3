TripsIndexCtrl.$inject = ['Trip'];

function TripsIndexCtrl(Trip) {

  const vm = this; //ViewModel allows us to use this in function
  vm.isActive = true;
  vm.newTrip = {};
  vm.locationName = '';
  vm.newPlace = {
    location: {
      lat: 0,
      lng: 0
    }
  };

  function handleSubmit() {
    if(vm.form.$invalid) return false;
    vm.isActive = !vm.isActive;
    console.log(vm.newPlace);
    console.log(vm.locationName);

  }


  this.handleSubmit = handleSubmit;


}

export default TripsIndexCtrl;
