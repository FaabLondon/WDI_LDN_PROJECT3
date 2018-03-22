AuthRegisterLoginCtrl.$inject = ['$auth', 'Trip', '$state', '$rootScope','$timeout'];

function AuthRegisterLoginCtrl($auth, Trip, $state, $rootScope,$timeout){
  const vm = this;
  vm.credentials = {};
  vm.user = {};
  vm.message = '';
  vm.registered = false;

  function handleRegister(){
    //when do signup, sends request to $authProvider.signupUrl = '/api/register' as defined in config file
    if(this.form.$invalid) return false;
    $auth.signup(vm.user)
      .then(() => {
        vm.registered = !vm.registered;
        $state.go('homepage');
      })
      .catch(res => {
        if(res.data.message === 'Unprocessable Entity'){
          vm.message = 'Passwords do not match';
        } else vm.message = '';
      });
  }

  $rootScope.$on('flashMessage', (e, data) => {
    vm.flashMessage = data;  //content of the broascasted message with type and content
    $timeout(() => vm.flashMessage = null, 2000);
  });

  function handleLogin(){
    //send the credentials to server with satelliser and get the token back from server
    //when do login(), sends request to $authProvider.loginUrl = '/api/login'; as defined in config file - //sends login request to server with email and password entered in form and sends back token object from server (see in web tools in local storage)
    if(this.form.$invalid) return false;
    $auth.login(this.credentials)
    //flash message removed
      .then(res => {
        //console.log(res.data.message);
        Trip.userName = res.data.message;
        $state.go('tripsNew');
      })
      .catch(res => {
        if(res.data.message === 'Unauthorized'){
          vm.message = 'Invalid credentials - Please try again';
        } else vm.message = '';
      });
  }

  vm.handleRegister = handleRegister;
  vm.handleLogin = handleLogin;

}

export default AuthRegisterLoginCtrl;
