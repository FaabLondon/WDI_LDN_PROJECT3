TripsIndexCtrl.$inject = ['Trip', 'currentTripService', '$state'];

function TripsIndexCtrl(Trip, currentTripService, $state) {

  Trip.find()
    .then(res => this.trips = res.data);

  function deleteTrip(tripId){
    Trip.removeTrip(tripId)
      .then(() => $state.go('tripsIndex'));
  }

  this.currentTrip = currentTripService.get();
  this.deleteTrip = deleteTrip;
}


export default TripsIndexCtrl;
