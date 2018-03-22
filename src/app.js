import angular from 'angular';
import 'satellizer'; //for authetification on client side
import 'angular-messages'; //for messages in form validation management
import 'jsonwebtoken';
//Router
import '@uirouter/angularjs';
import Router from './config/router';

//config for Auth
import Auth from './config/auth';

//controllers
import AuthRegisterLoginCtrl from './controllers/auth/authRegisterLogin';
import TripsIndexCtrl from './controllers/trips/tripsIndex';
import TripsNewCtrl from './controllers/trips/tripsNew';
import TripsShowCtrl from './controllers/trips/tripsShow';
import MainCtrl from './controllers/main';

//service
import Trip from './services/trip';
import mapService from './services/map';
import searchService from './services/search';
import directionsService from './services/directions';
import currentTripService from './services/currentTrip';

//directives
import googleMap from './directives/google-map';
import googleAutocomplete from './directives/google-autocomplete';
// import googleDirections from './directives/google-directions';

//sass styling and bulma
import './assets/scss/style.scss';
import 'bulma';

//setup angular module
angular
  .module('holidayPlanner', ['ui.router', 'satellizer', 'ngMessages'])
  .config(Router)
  .config(Auth)
  .service('Trip', Trip)
  .service('mapService', mapService)
  .service('searchService', searchService)
  .service('directionsService', directionsService)
  .service('currentTripService', currentTripService)
  .controller('AuthRegisterLoginCtrl', AuthRegisterLoginCtrl)
  .controller('TripsIndexCtrl', TripsIndexCtrl)
  .controller('MainCtrl', MainCtrl)
  .controller('TripsShowCtrl', TripsShowCtrl)
  .controller('TripsNewCtrl', TripsNewCtrl)
  .directive('googleMap',googleMap)
  .directive('googleAutocomplete',googleAutocomplete);
  // .directive('googleDirections', googleDirections);
