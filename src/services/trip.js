Trip.$inject = ['$http', '$rootScope'];

//directive will be injected in different controllers. Only 1 instance of it (Singleton)

function Trip($http, $rootScope) {
  const vm = this;
  vm.map;
  vm.userName = '';
  vm.searchResult = [];
  vm.tripId = '';

  vm.currentTrip = {};
  //variables used to display routes between different places and waypoints
  vm.directionsService = new google.maps.DirectionsService;
  vm.directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

  //function to create a new trip - the user id is added on the server side
  function create(trip) {
    return $http.post('/api/trips', trip);
  }

  //function to add a place to a trip - returns the updated trip
  function createPlaceTrip(place){
    return $http.post(`/api/trips/${vm.tripId}/places`, place);
  }


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
              if(nbPlaces > 1) {
                //calls function to update and render display route on map
                vm.calculateAndDisplayRoute(vm.directionsService, vm.directionsDisplay);
              }
            });
        }
      })
      .catch(err => console.log(err));
  }

  // function getPlaceTrip(place){
  //
  // }

  //function to show all places in a trip
  function showTrip(){
    return $http.get(`/api/trips/${vm.tripId}`);
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
        console.log('sendingfrom service:', res.data);
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

    //Add each place to waypoints. Should not be doing it for each place as would have origin and destination in doublon...however it works that way as google is smart...
    //should only loop from index 1 to array length - 2
    vm.currentTrip.days[0].places.forEach(place => {
      waypts.push({
        location: place.location,
        stopover: true
      });
    });

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
        // var route = response.routes[0];
        // var summaryPanel = document.getElementById('directions-panel');
        // summaryPanel.innerHTML = '';
        // // For each route, display summary information.
        // for (var i = 0; i < route.legs.length; i++) {
        //   var routeSegment = i + 1;
        //   summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
        //       '</b><br>';
        //   summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        //   summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        //   summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
        //}
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



}

export default Trip;
