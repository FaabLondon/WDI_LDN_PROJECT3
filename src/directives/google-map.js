/* global google */
googleMap.$inject = ['mapService'];
function googleMap(mapService) {
  return {
    restrict: 'E',
    template: '<div class="google-map"></div>',
    replace: true,
    scope: {
      center: '=',
      zoom: '=',
      results: '=?'
    },
    link($scope, $element) {
      //create new map
      const map = new google.maps.Map($element[0], {
        center: $scope.center,
        zoom: $scope.zoom, //zoom not working
        mapTypeId: google.maps.MapTypeId.ROADMAP //mapTypeId not working
      });

      let markers = [];

      mapService.set(map);

      function createMarkers() {
        markers.forEach(marker => marker.setMap(null));

        markers = $scope.results.map(place => {
          const marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });

          return marker;
        });
      }

      //set a watch on center change
      $scope.$watch('center', () => map.setCenter($scope.center), true);
      $scope.$watch('results', createMarkers, true);
    }
  };
}

export default googleMap;
