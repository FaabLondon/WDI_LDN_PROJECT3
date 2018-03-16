AuthRegisterLoginCtrl.$inject = ['$auth', '$state', '$rootScope'];

function AuthRegisterLoginCtrl($auth, $state, $rootScope){
  const vm = this;
  vm.credentials = {};
  vm.user = {};
  vm.registered = false;

  function handleRegister(){
    //when do signup, sends request to $authProvider.signupUrl = '/api/register' as defined in config file
    $auth.signup(vm.user)
      .then(() => {
        vm.registered = !vm.registered;
        $state.go('homepage');
      });
  }


  function handleLogin(){
    //send the credentials to server with satelliser and get the token back from server
    //when do login(), sends request to $authProvider.loginUrl = '/api/login'; as defined in config file - //sends login request to server with email and password entered in form and sends back token object from server (see in web tools in local storage)
    $auth.login(this.credentials)
      .then($state.go('tripsIndex'));

    //removed the flash message

  }

  vm.handleRegister = handleRegister;
  this.handleLogin = handleLogin;

}

export default AuthRegisterLoginCtrl;
