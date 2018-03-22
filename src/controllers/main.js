MainCtrl.$inject = ['$auth','Trip', '$state', '$transitions', '$scope', 'currentTripService', 'mapService', '$timeout'];

function MainCtrl($auth, Trip, $state, $transitions, $scope, currentTripService, mapService, $timeout) {
  const vm = this; //ViewModel - allows us to use this in function
  vm.currentTrip = {};

  //rootscope listen
  $scope.$on('trip:set', (e) => {
    vm.currentTrip = currentTripService.get();
  });

  $scope.$on('flashMessage', (e, data) => {
    vm.flashMessage = data;
    $timeout(() => vm.flashMessage = null, 2000);
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
