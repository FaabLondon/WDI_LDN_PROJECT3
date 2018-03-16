Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function Router($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('homepage', {
      url: '/',
      templateUrl: 'views/trips/home.html',
      controller: 'PlacesHomeCtrl as PlacesHome'
    });

  $urlRouterProvider.otherwise('/');
}

export default Router;
