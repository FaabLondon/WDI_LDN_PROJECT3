/* global google */

function googleAutocomplete() {
  return {
    restrict: 'C',
    scope: {
      coordinates: '=',
      address: '=',
      image: '='
    },
    link($scope, $element) {

      $scope.$watch('coordinates', () => console.log());
      const input = $element[0];
      const autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.addListener('place_changed', () => {
        console.log('autocomplete log', autocomplete.getPlace());
        const address = autocomplete.getPlace().formatted_address;
        const coordinates = autocomplete.getPlace().geometry.location;
        const lat = coordinates.lat();
        const lng = coordinates.lng();
        console.log($scope);
        $scope.coordinates.lat = lat;
        $scope.coordinates.lng = lng;
        $scope.address = address;
        $scope.image = autocomplete.getPlace().photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100});

      });
    }
  };
}

export default googleAutocomplete;
