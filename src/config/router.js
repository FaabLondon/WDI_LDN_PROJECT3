Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true); //removes #!

  $stateProvider
    .state('homepage', {
      url: '/',
      templateUrl: 'views/trips/home.html',
      controller: 'PlacesHomeCtrl as PlacesHome'
    })
    .state('placesIndex', {
      url: '/index',
      templateUrl: 'views/trips/index.html',
      controller: 'TripsIndexCtrl as tripsIndex'
    });


  $urlRouterProvider.otherwise('/index');

}

export default Router;
