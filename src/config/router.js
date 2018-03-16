Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true); //removes #!

  $stateProvider
    .state('tripsIndex', {
      url: '/trips',
      templateUrl: 'views/trips/index.html'
      // controller: 'TripsIndexCtrl as tripsIndex'
    });

  $urlRouterProvider.otherwise('/trips');
}

export default Router;
