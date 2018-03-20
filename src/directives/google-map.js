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
      //currentTrip: '=',
      searchCat: '='
    },
    link($scope, $element) {
      let service;
      let infoWindow;

      //variables used to display routes between different places and waypoints
      //USED TO BE HERE


      $scope.$watch('searchCat', () => {
        console.log('running', $scope.searchCat);
        showPlaces();
      }, true);

      //create new map
      Trip.map = new google.maps.Map($element[0], {
        center: $scope.center,
        zoom: $scope.zoom, //zoom not working
        mapTypeId: google.maps.MapTypeId.ROADMAP //mapTypeId not working
      });

      //to link the directions rendering to the map
      Trip.directionsDisplay.setMap(Trip.map);

      //in order to style the markers/images. The image can then be styled in css
      //important to set optimized: false in marker
      var myoverlay = new google.maps.OverlayView();
      myoverlay.draw = function () {
        //this assigns an id to the markerlayer Pane, so it can be referenced by CSS
        this.getPanes().markerLayer.id='markerLayer';
      };
      myoverlay.setMap(Trip.map);

      //set a wathc on center change
      $scope.$watch('center', () => {
        Trip.map.setCenter($scope.center);
        //need to set zoom and mapType here
        showPlaces();
      }, true);


      ////Google Places search
      function showPlaces() {
        console.log('s cat:', $scope.searchCat);
        const request = {
          location: $scope.center,
          radius: '500',
          type: [$scope.searchCat]
          // type: ['museum']
        };

        //service to run a nearby search on google places
        infoWindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(Trip.map);
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            Trip.searchResult = [];
            createDetailedSearchResults(results);
          }
        });
      }

      //not working
      // $scope.$watch('searchCat', () => {
      //   console.log('running');
      //   showPlaces();
      // });

      //callback function called for each place after getDetails()
      function callbackDetails(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          let url = '';

          //get error message Uncaught TypeError: a.url.substr is not a function
          //picture for the marker
          place.photos ? url = place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}): url = '';

          const image = {
            url: url,
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(45, 45)
          };

          //setup marker for that specific place
          const marker = new google.maps.Marker({
            map: Trip.map,
            icon: image,
            title: place.name,
            position: place.geometry.location,
            optimized: false
          });

          //add mouseover event to each marker to display box with name
          google.maps.event.addListener(marker, 'mouseover', function() {
            const html = `<b>${place.name}</b> <br/>${place.vicinity}<br/>Rating:${'🤩'.repeat(Math.floor(place.rating))}<br/><b>Click on the picture to add this place to your trip</b>`;
            infoWindow.setContent(html);
            infoWindow.open(Trip.map, marker);
          });

          //add click event to each marker to add it to trip
          google.maps.event.addListener(marker, 'click', function() {

            //test to avoid adding duplicate place on the same day
            if(!Trip.currentTrip.days[0].places.find(element => {
              return element.googleId === place.place_id;
            })
            ){
              //update and format newPlace with google pictures before adding to the trip
              place.pictures = place.photos ? place.photos[0].getUrl({'maxWidth': 800, 'maxHeight': 800}): '';
              Trip.createPlace(place);

            }
          });

          //add detailed picture to each place object to be accessed in view
          //might want to change to just place.photos to get access to array of pics
          //Uncaught TypeError: a.url.substr is not a function
          place.photos ? place.pictures = place.photos[0].getUrl({'maxWidth': 800, 'maxHeight': 800}): place.pictures = '';

          //save the search result in Trip.searchResult in order to use in controller and view
          Trip.searchResult.push(place);
        }
      }

      function createDetailedSearchResults(places) {
        const bounds = new google.maps.LatLngBounds();
        service = new google.maps.places.PlacesService(Trip.map);
        places.forEach(place => {

          const requestDetails = {
            placeId: place.place_id
          };

          service.getDetails(requestDetails, callbackDetails);
          bounds.extend(place.geometry.location);
        });
        Trip.map.fitBounds(bounds);
      }

      //setup function to render and display route
      //USED TO BE HERE

    }
  };
}

export default googleMap;
