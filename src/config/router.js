secureState.$inject = ['$q', '$state', '$auth', '$rootScope']; //angular promise library is q
//secure state to avoid user to go to unauthorised pages (like /places/new)
//secureState is a promise. If resolves, we go to the place we want to go to
function secureState($q, $state, $auth, $rootScope){
  return new $q((resolve) => {
    if($auth.isAuthenticated()) return resolve(); //if we have a token, you are allowed to go to the state you want to go to

    console.log('broadcasting warning message not logged in');
    $rootScope.$broadcast('flashMessage', {
      type: 'danger',
      content: 'You must be logged in.'
    });

    $state.go('homepage'); //if not, go to login page
  });
}

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true); //removes #!

  $stateProvider
  //registration and login
    .state('homepage', {
      url: '/',
      templateUrl: 'views/trips/home.html',
      controller: 'AuthRegisterLoginCtrl as AuthRegisterLogin'
    })
  //
    .state('tripsNew',{
      url: '/trips/new',
      templateUrl: 'views/trips/new.html',
      controller: 'TripsNewCtrl as tripsNew'
    })
    .state('tripsShow',{
      url: '/trips/:id?showDailyPlan',
      templateUrl: 'views/trips/show.html',
      controller: 'TripsShowCtrl as tripsShow'
    })
    .state('tripsIndex', {
      url: '/trips',
      templateUrl: 'views/trips/index.html',
      controller: 'TripsIndexCtrl as tripsIndex',
      resolve: {secureState}
    });


  $urlRouterProvider.otherwise('/');

}

export default Router;
