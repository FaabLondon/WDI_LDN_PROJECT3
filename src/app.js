import angular from 'angular';
import 'satellizer'; //for authetification on client side
import 'angular-messages'; //for messages in form validation management

//Router
import '@uirouter/angularjs';
import Router from './config/router';

//config for Auth
//import Auth from './config/auth';

//controllers
import PlacesHomeCtrl from './controllers/trips/home';
import TripsIndexCtrl from './controllers/trips/tripsIndex';
import MainCtrl from './controllers/trips/main';

//service


//directives


//sass styling and bulma
import './assets/scss/style.scss';
import 'bulma';

//setup angular module
angular
  .module('holidayPlanner', ['ui.router', 'satellizer', 'ngMessages'])
  .config(Router)
  .controller('MainCtrl', MainCtrl)
  .controller('PlacesHomeCtrl', PlacesHomeCtrl)
  .controller('TripsIndexCtrl', TripsIndexCtrl);
