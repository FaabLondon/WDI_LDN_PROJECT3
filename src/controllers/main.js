MainCtrl.$inject = ['$auth','Trip', '$state', '$transitions'];

function MainCtrl($auth, Trip, $state, $transitions) {
  const vm = this; //ViewModel - allows us to use this in function
  vm.currentTrip = {};

  vm.navIsVisible = true;

  //need to store whether user is authenticated or not in order to test it in view and hide/show buttons accordingly.
  vm.isAuthenticated = $auth.isAuthenticated;

  $transitions.onSuccess({}, () => {
    vm.navIsVisible = !['homepage', 'tripsNew'].includes($state.$current.name);
  });

  function logout(){
    $auth.logout(); //removes token from local storage
    $state.go('homepage');
  }
  vm.logout = logout;
}
export default MainCtrl;
