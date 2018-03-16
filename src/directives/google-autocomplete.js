/* global google */

function googleAutocomplete() {
  return {
    restrict: 'C',
    scope: {
      location: '='

    },
    link($scope, $element) {

      $scope.$watch('location', () => console.log($scope.location));
      const input = $element[0];
      const autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.addListener('place_changed', () => {
        const address = autocomplete.getPlace().formatted_address;
        const location = autocomplete.getPlace().geometry.location;
        const lat = location.lat();
        const lng = location.lng();

        $scope.location.lat = lat;
        $scope.location.lng = lng;
        $scope.address = address;

      });
    }
  };
}

export default googleAutocomplete;
