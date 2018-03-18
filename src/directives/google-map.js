/* global google */
googleMap.$inject = ['Trip'];

function googleMap(Trip) {
  return {
    restrict: 'E',
    template: '<div class="google-map"></div>',
    replace: true,
    scope: {
      center: '=',
      zoom: '=',
      searchCat: '='
    },
    link($scope, $element) {
      let service;
      let infoWindow;

      //variables used to display routes between different places and waypoints
      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;

      //create new map
      const map = new google.maps.Map($element[0], {
        center: $scope.center,
        zoom: $scope.zoom, //zoom not working
        mapTypeId: google.maps.MapTypeId.ROADMAP //mapTypeId not working
      });


      //to link the directions rendering to the map
      directionsDisplay.setMap(map);

      $scope.$watch('center', () => {
        map.setCenter($scope.center);
        //need to set zoom and mapType here
        showPlaces();
      }, true);

      ////Google Places search
      function showPlaces() {
        const request = {
          location: $scope.center,
          radius: '500',
          // type: [$scope.searchCat]
          type: ['museum']
        };

        //service to run a nearby search on google places
        infoWindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            Trip.searchResult = [];
            createDetailedSearchResults(results);
          }
        });
      }

      //not working
      $scope.$watch('searchCat', () => {
        showPlaces;
      }, true);

      //callback function called for each place after getDetails()
      function callbackDetails(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          let url = '';

          //get error message Uncaught TypeError: a.url.substr is not a function
          place.photos ? url = place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}): url = '';

          const image = {
            url: url,
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(45, 45)
          };

          const marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
          });

          //add mouseover event to each marker to display box with name
          google.maps.event.addListener(marker, 'mouseover', function() {
            var request = {placeId: place.place_id};

            service.getDetails(request, function(result, status) {
              if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
              }
              const html = `<b>${result.name}</b> <br/>${result.vicinity}<br/>Rating:${'🤩'.repeat(Math.floor(result.rating))}`;
              infoWindow.setContent(html);
              infoWindow.open(map, marker);
            });
          });

          //add click event to each marker to add it to trip
          google.maps.event.addListener(marker, 'click', function() {
            //
            let newPlace = {location: {lat: 0,lng: 0}};

            //update and format newPlace that will be added to trip
            newPlace.name = place.name;
            newPlace.address = place.vicinity; //check if formatted address exists
            newPlace.location.lat = place.geometry.location.lat();
            newPlace.location.lng = place.geometry.location.lng();
            newPlace.image = place.photos ? place.photos[0].getUrl({'maxWidth': 300, 'maxHeight': 150}): '';
            newPlace.description = '';
            newPlace.rating = place.rating;

            //add it to the trip
            Trip.createPlaceTrip(newPlace)
              .then(res => {
                Trip.currentTrip = res.data;
              })
              .then(() => {
                //only display direction if more than 1 place in the trip
                let nbPlaces = Trip.currentTrip.days[0].places.length;
                if(nbPlaces > 1) {
                  //calls function to update and render display route on map
                  calculateAndDisplayRoute(directionsService, directionsDisplay);
                }
              });

          });

          //add detailed picture to each place object to be accessed in view
          //might want to change to just place.photos to get access to array of pics
          //Uncaught TypeError: a.url.substr is not a function
          place.photos ? place.pictures = place.photos[0].getUrl({'maxWidth': 300, 'maxHeight': 150}): place.pictures = '';

          //save the search result in Trip.searchResult in order to use in controller and view
          Trip.searchResult.push(place);
        }
      }

      function createDetailedSearchResults(places) {
        const bounds = new google.maps.LatLngBounds();
        service = new google.maps.places.PlacesService(map);
        places.forEach(place => {

          const requestDetails = {
            placeId: place.place_id
          };

          service.getDetails(requestDetails, callbackDetails);
          bounds.extend(place.geometry.location);
        });
        map.fitBounds(bounds);
      }

      //setup function to render and display route
      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        console.log(Trip.currentTrip);
        let waypts = [];
        let nbPlaces = Trip.currentTrip.days[0].places.length;
        let origin = {location: {lat: 0,lng: 0}};
        let destination = {location: {lat: 0,lng: 0}};
        origin.location.lat = Trip.currentTrip.days[0].places[0].location.lat;
        origin.location.lng = Trip.currentTrip.days[0].places[0].location.lng;
        destination.location.lat = Trip.currentTrip.days[0].places[nbPlaces - 1].location.lat;
        destination.location.lng = Trip.currentTrip.days[0].places[nbPlaces - 1].location.lng;


        Trip.currentTrip.days[0].places.forEach(place => {
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
          travelMode: 'DRIVING'
        };

        function callBackDirections(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            // code to display route in a panel - need to define a DOM element to display it in
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
        directionsService.route(request, callBackDirections);
      }


    }
  };
}

export default googleMap;
