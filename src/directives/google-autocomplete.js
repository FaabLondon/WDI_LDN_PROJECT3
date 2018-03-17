/* global google */

function googleAutocomplete() {
  return {
    restrict: 'C',
    scope: {
      coordinates: '='
    },
    link($scope, $element) {

      $scope.$watch('coordinates', () => console.log());
      const input = $element[0];
      const autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.addListener('place_changed', () => {
        //const place = autocomplete.getPlace();
        const coordinates = autocomplete.getPlace().geometry.location;
        const lat = coordinates.lat();
        const lng = coordinates.lng();

        $scope.coordinates.lat = lat;
        $scope.coordinates.lng = lng;

      });
    }
  };
}

export default googleAutocomplete;
