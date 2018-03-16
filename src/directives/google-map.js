/* global google */

function googleMap() {
  return {
    restrict: 'E',
    template: '<div class="google-map"></div>',
    replace: true,
    scope: {
      center: '=',
      zoom: '='
    },
    link($scope, $element) {

      const map = new google.maps.Map($element[0], {
        zoom: $scope.zoom,
        center: $scope.center
      });
      $scope.$watch('center', () => {
        map.setCenter($scope.center);
      }, true);
    }
  };
}

export default googleMap;
