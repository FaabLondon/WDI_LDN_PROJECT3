TripsIndexCtrl.$inject = ['Trip'];

function TripsIndexCtrl(Trip) {

  Trip.find()
    .then(res => this.trips = res.data);
}

export default TripsIndexCtrl;
