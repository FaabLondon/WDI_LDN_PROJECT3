/* global google */

Trip.$inject = ['$http', '$rootScope'];

//directive will be injected in different controllers. Only 1 instance of it (Singleton)

function Trip($http, $rootScope) {
  const vm = this;
  vm.map;
  vm.userName = '';
  vm.searchResult = [];
  vm.tripId = '';
  //vm.allUsersTrips;
  vm.currentTrip = {};
  //variables used to display routes between different places and waypoints
  vm.directionsService = new google.maps.DirectionsService;
  vm.directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

  //function to create a new trip - the user id is added on the server side
  function create(trip) {
    return $http.post('/api/trips', trip);
  }
  // function show specific trip  
  function showTrip(tripId) {
    return $http.get(`/api/trips/${tripId}`);
  }
  //function to add a place to a trip - returns the updated trip
  function createPlaceTrip(place){
    return $http.post(`/api/trips/${vm.tripId}/places`, place);
  }

  function indexTrip(){
    return $http.get(`/api/user/${userId}/trips`);
  }


  //delete Google Place from the trip
  function deletePlaceTrip(place){

    let delPlace = {};
    //need to get place id based on googleid before we delete from the DB
    $http.get(`/api/trips/${vm.tripId}`)
      .then(res => {
        delPlace = res.data.days[0].places.find(pl => pl.googleId === place.place_id);
        if(delPlace){
          $http.delete(`/api/trips/${vm.tripId}/places/${delPlace._id}`)
            .then(res => {
              vm.currentTrip = res.data;
              $rootScope.$broadcast('trip updated', res.data);
            })
            .then(() => {
              //only display direction if more than 1 place in the trip
              const nbPlaces = vm.currentTrip.days[0].places.length;
              if(nbPlaces > 0) { //in case there is only 1 place left
                //calls function to update and render display route on map
                vm.calculateAndDisplayRoute(vm.directionsService, vm.directionsDisplay);
              }
            });
        }
      })
      .catch(err => console.log(err));
  }


  function seeAllTrips(req, res, next){
    return $http.get('/api/trips');
  }

  //function to add place - calls createPlaceTrip
  function createPlace(place){
    const newPlace = {location: {lat: 0,lng: 0}};
    //update and format newPlace that will be added to trip
    newPlace.name = place.name;
    newPlace.address = place.vicinity; //check if formatted address exists
    newPlace.location.lat = place.geometry.location.lat();
    newPlace.location.lng = place.geometry.location.lng();
    newPlace.image = place.pictures;
    newPlace.description = '';
    newPlace.rating = place.rating;
    newPlace.googleId = place.place_id;


    // add the place to the trip
    vm.createPlaceTrip(newPlace)
      .then(res => {
        vm.currentTrip = res.data;
        //console.log('sendingfrom service:', res.data);
        $rootScope.$broadcast('trip updated', res.data);
      })
      .then(() => {
        //only display direction if more than 1 place in the trip
        const nbPlaces = vm.currentTrip.days[0].places.length;
        if(nbPlaces > 1) {
          //calls function to update and render display route on map
          vm.calculateAndDisplayRoute(vm.directionsService, vm.directionsDisplay);
        }
      });
  }

  //function to add places to map to calc and render directions
  //setup function to render and display route
  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    console.log(vm.currentTrip);
    const waypts = [];
    const nbPlaces = vm.currentTrip.days[0].places.length;
    let origin = {location: {lat: 0,lng: 0}};
    let destination = {location: {lat: 0,lng: 0}};
    origin.location = vm.currentTrip.days[0].places[0].location;
    destination.location = vm.currentTrip.days[0].places[nbPlaces - 1].location;

    //Add each place to waypoints except for origin (1st element in array) and destination (last element of array) - directions are optimised by google on origin, destination and all waypoints
    if(nbPlaces > 2){
      for (let i = 1; i < nbPlaces - 1; i++){
        waypts.push({
          location: vm.currentTrip.days[0].places[i].location,
          stopover: true
        });
      }
    } //else waypts stays [];

    //define request to get directions
    const request = {
      origin: origin,
      destination: destination,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'WALKING'
    };

    function callBackDirections(response, status) {
      if (status === 'OK') {
        // code to display route in a panel - need to define a DOM element to display it in
        directionsDisplay.setDirections(response);
        //send boradcats message to google-directions directive
        $rootScope.$broadcast('Directions updated', response);

      } else {
        window.alert('Directions request failed due to ' + status);
      }
    }

    //calls function to set route and directions
    directionsService.route(request, callBackDirections);
  }


  vm.calculateAndDisplayRoute = calculateAndDisplayRoute;
  vm.create = create;
  vm.createPlaceTrip = createPlaceTrip;
  vm.showTrip = showTrip;
  vm.createPlace = createPlace;
  vm.deletePlaceTrip = deletePlaceTrip;
  vm.seeAllTrips = seeAllTrips;



}

export default Trip;
