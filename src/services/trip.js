Trip.$inject = ['$http'];

function Trip($http) {
  // ALL FUNCTIONS RETURN PROMISES. $http AJAX requests.

  function find(){
    return $http.get('/api/trips');
  }
  // Index page - get all trips for a specific user. The filtering by user is done on the server side.

  function findById(tripId) {
    return $http.get(`/api/trips/${tripId}`);
  }
  // Show page - add places and daily plan - sending back one specific trip

  function create(trip) {
    return $http.post('/api/trips', trip);
  }
  // New page
  function removeTrip(tripId){
    return $http.delete(`/api/trips/${tripId}`);
  }
  // Index page - delete button

  function createPlace(trip, place){
    return $http.post(`/api/trips/${trip._id}/places`, convertGooglePlace(place));
  }
  // On show page you can add and delete places. When you do it it's a google place with their own key value pairs. Before you add to the database it needs to be converted into a place that matches our model. Runs the convertGooglePlace function and then posts to the database. Only for add.

  function deletePlace(trip, place){
    place = trip.days[0].places.find(_place => _place.googleId === place.place_id);
    return $http.delete(`/api/trips/${trip._id}/places/${place._id}`);
  }
  // On the minus button, it is a google place so it only had a googleId. Before you ask server to delete the place you need to find the place that has that googleId. Google place has a field called place_id, we are looking in our database for the place which has a googleId equal to the google place. Returns a place in our database and we then use the normal database id to delete it.

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
  this.removeTrip = removeTrip;
  // this.keepDate=keepDate;
  // this.keepAddress=keepAddress;



}

export default Trip;
