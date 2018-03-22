TripsIndexCtrl.$inject = ['Trip', 'currentTripService'];

function TripsIndexCtrl(Trip, currentTripService) {

  Trip.find()
    .then(res => this.trips = res.data);

  this.currentTrip = currentTripService.get();
}

export default TripsIndexCtrl;
