Trip.$inject = ['$http'];

//directive will be injected in different controllers. Only 1 instance of it (Singleton)

function Trip($http) {

  function create(trip) {
    return $http.post('/api/trips', trip);
  }

  this.create = create;

}

export default Trip;
