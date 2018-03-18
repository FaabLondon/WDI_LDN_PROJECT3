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

      const map = new google.maps.Map($element[0], {
        zoom: $scope.zoom,
        center: $scope.center
      });

      // set center of Map
      $scope.$watch('center', () => {
        map.setCenter($scope.center);
        showPlaces();
      }, true);

      ////Google Places search
      function showPlaces(){
        console.log('herer');
        console.log($scope);
        const request = {
          location: $scope.center,
          radius: '500',
          type: [$scope.searchCat]
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);

        function callback(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            //console.log(results);
            Trip.searchResult = results;
            // for (var i = 0; i < results.length; i++) {
            //   let place = results[i];
            //   //createMarker(results[i]);
            // }
          }
        }
      }

      $scope.$watch('searchCat', () => {
        showPlaces;
      }, true);


    }
  };
}

export default googleMap;
