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

  function deletePlaceTrip(place){
    console.log(place);
    console.log('service place');
    console.log(vm.trip);

    let delPlace = {};
    $http.get(`/api/trips/${vm.tripId}`)
      .then(res => {
        console.log('resData', res.data);
        delPlace = res.data.days[0].places.find(pl => pl.googleId === place.place_id);
        console.log('place to delete id', delPlace._id);
      })
      .then(() => $http.delete(`/api/trips/${vm.tripId}/places/${delPlace._id}`))
      .catch(err => console.error(err));
  }

  // function getPlaceTrip(place){
  //
  // }

  //function to show all places in a trip
  function showTrip(){
    return $http.get(`/api/trips/${vm.tripId}`);
  }


  this.create = create;
  this.createPlaceTrip = createPlaceTrip;
  this.showTrip = showTrip;
  this.deletePlaceTrip = deletePlaceTrip;
  //this.getPlaceTrip = getPlaceTrip;

}

export default Trip;
