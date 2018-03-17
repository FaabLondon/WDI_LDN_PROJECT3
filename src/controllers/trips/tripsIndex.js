TripsIndexCtrl.$inject = ['$http'];

function TripsIndexCtrl($http) {

  const vm = this; //ViewModel allows us to use this in function
  vm.isActive = true;
  vm.newTrip = {};
  vm.newPlace = {
    location: {
      lat: 0,
      lng: 0
    }
  };

  function handleSubmit() {
    vm.isActive = !vm.isActive;
    console.log(vm.showModal);
    if(vm.form.$invalid) return false;
  }
  this.handleSubmit = handleSubmit;

  vm.all = {};
  $http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&key=AIzaSyAPEmf9_jhooXaFG-9VI-W1catLwZ5vGfg')
    .then(res => Object.assign(vm.all, res))
    .then(res => vm.all = res.data);
  return console.log(vm.all);



}

export default TripsIndexCtrl;
