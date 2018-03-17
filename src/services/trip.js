Trip.$inject = ['$http'];

//directive will be injected in different controllers. Only 1 instance of it (Singleton)

function Trip($http) {

  const userName = '';
  const searchResult = [];
  const tripId = '';

  //function to create a new trip - the user id is added on the server side
  function create(trip) {
    return $http.post('/api/trips', trip);
  }

  //function to add a place to a trip
  function createPlaceTrip(place){
    return $http.post(`/trips/${tripId}/places`, place);
  }


  this.create = create;
  this.createPlaceTrip = createPlaceTrip;

}

export default Trip;
