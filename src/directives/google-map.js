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

      const map = new google.maps.Map($element[0], {
        center: $scope.center,
        zoom: $scope.zoom, //zoom not working
        mapTypeId: google.maps.MapTypeId.ROADMAP //mapTypeId not working
      });

      // set center of Map
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
            let newPlace = {};
            newPlace.location ={};
            //update and format newPlace that will be added to trip
            newPlace.name = place.name;
            newPlace.address = place.vicinity; //check if formatted address exists
            Object.assign(newPlace.location, place.geometry.location);
            newPlace.image = place.photos ? place.photos[0].getUrl({'maxWidth': 300, 'maxHeight': 150}): '';
            newPlace.description = '';
            newPlace.rating = place.rating;

            //add it to the trip
            Trip.createPlaceTrip(newPlace);

          });

          //add detailed picture to each place object to be accessed in view
          //might want to change to just place.photos to get access to array of pics
          //Uncaught TypeError: a.url.substr is not a function
          place.photos ? place.pictures = place.photos[0].getUrl({'maxWidth': 300, 'maxHeight': 150}): place.pictures = '';

          //save the search result in Trip.searchResult
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
    }
  };
}

export default googleMap;
