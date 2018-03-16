AuthRegisterLoginCtrl.$inject = ['$auth', '$state'];

function AuthRegisterLoginCtrl($auth, $state){
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
        }
      });
  }


  function handleLogin(){
    //send the credentials to server with satelliser and get the token back from server
    //when do login(), sends request to $authProvider.loginUrl = '/api/login'; as defined in config file - //sends login request to server with email and password entered in form and sends back token object from server (see in web tools in local storage)
    if(this.form.$invalid) return false;
    $auth.login(this.credentials)
    //flash message removed
      .then(res => {
        console.log(res.data.message);
        $state.go('tripsIndex');
      })
      .catch(res => {
        if(res.data.message === 'Unauthorized'){
          vm.message = 'Invalid credentials - Please try again';
        }
      });
  }


  vm.handleRegister = handleRegister;
  vm.handleLogin = handleLogin;

}

export default AuthRegisterLoginCtrl;
