TripsIndexCtrl.$inject = [];
function TripsIndexCtrl() {

  const vm = this; //ViewModel allows us to use this in function

  vm.newPlace = {
    location: {
      lat: 0,
      lng: 0
    }
  };



}

export default TripsIndexCtrl;
