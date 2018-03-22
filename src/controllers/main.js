MainCtrl.$inject = ['$auth','Trip', '$state', '$transitions', '$scope', 'currentTripService', 'mapService'];

function MainCtrl($auth, Trip, $state, $transitions, $scope, currentTripService, mapService) {
  const vm = this; //ViewModel - allows us to use this in function
  vm.currentTrip = {};

  //rootscope listen
  $scope.$on('trip:set', (e) => {
    vm.currentTrip = currentTripService.get();
  });

  vm.navIsVisible = true;

  //need to store whether user is authenticated or not in order to test it in view and hide/show buttons accordingly.
  vm.isAuthenticated = $auth.isAuthenticated;

  $transitions.onSuccess({}, () => {
    vm.navIsVisible = !['homepage', 'tripsNew'].includes($state.$current.name);
  });

  function logout(){
    $auth.logout(); //removes token from local storage
    mapService.destroy();
    $state.go('homepage');
  }
  vm.logout = logout;
}
export default MainCtrl;
