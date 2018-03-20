Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true); //removes #!

  $stateProvider
    .state('homepage', {
      url: '/',
      templateUrl: 'views/trips/home.html',
      controller: 'AuthRegisterLoginCtrl as AuthRegisterLogin'
    })
    .state('tripsIndex', {
      url: '/trips',
      templateUrl: 'views/trips/index.html',
      controller: 'TripsIndexCtrl as tripsIndex'
    })
    .state('allTrips', {
      url: '/trips/all',
      templateUrl: 'views/trips/allTrips.html',
      controller: 'AllTripsCtrl as AllTrips'
    });


  $urlRouterProvider.otherwise('/');

}

export default Router;
