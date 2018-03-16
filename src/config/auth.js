//to configure satellizer to tell him where to send login and registration requests
Auth.$inject = ['$authProvider'];

function Auth($authProvider) {

  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';

}

export default Auth;
