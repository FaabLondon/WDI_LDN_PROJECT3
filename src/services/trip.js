Trip.$inject = ['$http'];
function Trip($http) {

  //function to create a new trip - the user id is added on the server side
  function find(){
    return $http.get('/api/trips');
  }

  function findById(tripId) {
    return $http.get(`/api/trips/${tripId}`);
  }
  // function show specific trip
  function create(trip) {
    return $http.post('/api/trips', trip);
  }

  //function to add a place to a trip - returns the updated trip
  function createPlace(trip, place){
    return $http.post(`/api/trips/${trip._id}/places`, convertGooglePlace(place));
  }

  //delete Google Place from the trip - returns the updated trip
  function deletePlace(trip, place){
    place = trip.days[0].places.find(_place => _place.googleId === place.place_id);
    return $http.delete(`/api/trips/${trip._id}/places/${place._id}`);
  }

  // this.address;
  // this.date;
  //
  // function keepAddress(address){
  //   this.address=address;
  // }
  // function keepDate(date){
  //   this.date=date;
  // }


  function convertGooglePlace(place) {
    const converted = {};

    converted.name = place.name;
    converted.address = place.vicinity;
    converted.location = place.geometry.location.toJSON();
    converted.image = place.photos ? place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}) : 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/house-icon.png';
    converted.rating = place.rating;
    converted.googleId = place.place_id;

    return converted;
  }



  // vm.createPlaceTrip = createPlaceTrip;
  this.find = find;
  this.findById = findById;
  this.create = create;
  this.createPlace = createPlace;
  this.deletePlace = deletePlace;
  // this.keepDate=keepDate;
  // this.keepAddress=keepAddress;



}

export default Trip;
