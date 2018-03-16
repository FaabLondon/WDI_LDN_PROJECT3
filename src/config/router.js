Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true); //removes #!

  $stateProvider
    .state('homepage', {
      url: '/',
      templateUrl: 'views/trips/home.html',
      controller: 'PlacesHomeCtrl as PlacesHome'
    })
    .state('tripsIndex', {
      url: '/trips',
      templateUrl: 'views/trips/index.html',
      controller: 'TripsIndexCtrl as tripsIndex'
    });


  $urlRouterProvider.otherwise('/');

}

export default Router;
