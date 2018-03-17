Trip.$inject = ['$http'];

//directive will be injected in different controllers. Only 1 instance of it (Singleton)

function Trip($http) {

  const userName = '';
  const searchResult = [];

  function create(trip) {
    return $http.post('/api/trips', trip);
  }

  this.create = create;

}

export default Trip;
