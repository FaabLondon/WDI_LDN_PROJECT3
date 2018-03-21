AllTripsCtrl.$inject = ['Trip', '$scope', '$rootScope' ,'$timeout'];

function AllTripsCtrl(Trip, $scope, $rootScope, $timeout) {
  const vm = this; //ViewModel - allows us to use this in function
  vm.allUsersTrips = [];

  $scope.$on('All trips sent', (e, allTrips) => {
    console.log('Received all trips for that user:', allTrips);
    vm.allUsersTrips = allTrips;
  });
  function backToIndex() {
  //broadcast click of change page button to call the function which will toggle the modal off

    $timeout(() =>   $rootScope.$broadcast('Toggle modal off on page change'), 200);
    $rootScope.$broadcast('Toggle modal off on page change');
    console.log('broadcasting toggle message');
  }

  function viewSpecificTrip(trip) {
  //broadcast click of change page button to call the function which will toggle the modal off and bring back specific trip
    $timeout(() =>   $rootScope.$broadcast('Modal off, bring back specific trip', trip._id), 200);
    $rootScope.$broadcast('Modal off, bring back specific trip', trip._id);
    console.log('broadcasting modal off and specific trip', trip._id);
  }
  vm.backToIndex = backToIndex;
  vm.viewSpecificTrip = viewSpecificTrip;
}


export default AllTripsCtrl;
