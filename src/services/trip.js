Trip.$inject = ['$http'];

//directive will be injected in different controllers. Only 1 instance of it (Singleton)

function Trip($http) {

  const userName = '';
  const searchResult = [];

  function create(trip) {
    return $http.post('/api/trips', trip);
  }
  function add(place) {
    return $http.post('/api/trips/:id/places', place);
  }


  this.create = create;
  this.add = add;

}

export default Trip;
