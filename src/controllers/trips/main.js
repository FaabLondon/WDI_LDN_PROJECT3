
/* global navigator */

MainCtrl.$inject = ['$auth', '$state'];
function MainCtrl($auth ,$state){
  const vm = this;

  vm.isAuthenticated = $auth.isAuthenticated;

  function logout(){
    $auth.logout();
    $state.go('tripsIndex');
  }

  //
  // $rootScope.$on('flashMessage', (e, data) => {
  //   vm.flashMessage = data;
  //
  //   $timeout(() => vm.flashMessage = null, 2000);
  // });
  //when the dollar rootscope broadcasts a message we get e which is the the event - which is the flashmessage, and the data is whatever we pass in so the content of the message, is danger etc

  vm.logout = logout;
}

export default MainCtrl;
