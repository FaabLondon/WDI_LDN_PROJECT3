MainCtrl.$inject = ['$auth','Trip', '$state', '$scope'];

function MainCtrl($auth, Trip, $state, $scope) {
  const vm = this; //ViewModel - allows us to use this in function
  vm.currentTrip = {};
  vm.address = '';

  //rootscope listen
  $scope.$on('address:set', (e, address) => {
    vm.address = address;
  });

  //need to store whether user is authenticated or not in order to test it in view and hide/show buttons accordingly.
  vm.isAuthenticated = $auth.isAuthenticated;

  function logout(){
    $auth.logout(); //removes token from local storage
    $state.go('homepage');
  }
  vm.logout = logout;
}
export default MainCtrl;
