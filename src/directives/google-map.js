/* global google */
googleMap.$inject = ['Trip'];

function googleMap(Trip) {
  return {
    restrict: 'E',
    template: '<div class="google-map"></div>',
    replace: true,
    scope: {
      center: '=',
      zoom: '='
    },
    link($scope, $element) {
      let service;

      const map = new google.maps.Map($element[0], {
        zoom: $scope.zoom,
        center: $scope.center
      });

      //set center of Map
      $scope.$watch('center', () => {
        map.setCenter($scope.center);
        showPlaces();
      }, true);

      ////Google Places search
      function showPlaces(){
        const request = {
          location: $scope.center,
          radius: '500',
          type: ['museum']
        };

        //service to run a nearby search on google places
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);

        function callback(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            Trip.searchResult = [];
            createDetailedSearchResults(results);
          }
        }

      }


      function callbackDetails(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {

          // var image = {
          //   url: place.icon,
          //   size: new google.maps.Size(71, 71),
          //   origin: new google.maps.Point(0, 0),
          //   anchor: new google.maps.Point(17, 34),
          //   scaledSize: new google.maps.Size(25, 25)
          // };

          var marker = new google.maps.Marker({
            map: map,
            icon: place.photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35}),
            title: place.name,
            position: place.geometry.location
          });
          //add detailed picture to each place object to be accessed in view
          //might want to change to just place.photos to get access to array of pics
          place.pictures = place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100});

          //save the search result in Trip.searchResult
          Trip.searchResult.push(place);
        }
      }

      function createDetailedSearchResults(places) {
        var bounds = new google.maps.LatLngBounds();
        service = new google.maps.places.PlacesService(map);
        places.forEach(place => {

          var requestDetails = {
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
