TripsIndexCtrl.$inject = ['Trip', 'currentTripService', '$state'];

function TripsIndexCtrl(Trip, currentTripService, $state) {

  //return all trips for a specific user
  Trip.find()
    .then(res => this.trips = res.data);

  //delete a specific trip for that user
  function deleteTrip(tripId){
    Trip.removeTrip(tripId)
      .then(() => $state.go('tripsIndex'));
  }

  this.currentTrip = currentTripService.get();
  this.deleteTrip = deleteTrip;
}


export default TripsIndexCtrl;
