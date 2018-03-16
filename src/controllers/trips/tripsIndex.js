TripsIndexCtrl.$inject = [];

function TripsIndexCtrl() {

  const vm = this; //ViewModel allows us to use this in function
  vm.isActive = true;
  vm.newTrip = {};

  function handleSubmit() {
    vm.isActive = !vm.isActive;
    console.log(vm.showModal);
    if(vm.form.$invalid) return false;
  }


  this.handleSubmit = handleSubmit;


}

export default TripsIndexCtrl;
