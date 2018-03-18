Trip.$inject = ['$http'];

//directive will be injected in different controllers. Only 1 instance of it (Singleton)

function Trip($http) {
  const vm = this;
  vm.userName = '';
  vm.searchResult = [];
  vm.tripId = '';
  vm.currentTrip = {};

  //function to create a new trip - the user id is added on the server side
  function create(trip) {
    return $http.post('/api/trips', trip);
  }

  //function to add a place to a trip - returns the updated trip
  function createPlaceTrip(place){
    return $http.post(`/api/trips/${vm.tripId}/places`, place);
  }

  //function to show all places in a trip
  function showTrip(){
    return $http.get(`/api/trips/${vm.tripId}`);
  }


  this.create = create;
  this.createPlaceTrip = createPlaceTrip;

}

export default Trip;
