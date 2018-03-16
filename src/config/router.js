Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true); //removes #!

  $stateProvider
    .state('placesIndex', {
      url: '/index',
      templateUrl: 'views/trips/index.html',
      controller: 'TripsIndexCtrl as tripsIndex'
    });

  $urlRouterProvider.otherwise('/index');
}

export default Router;
