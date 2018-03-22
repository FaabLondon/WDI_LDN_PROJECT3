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
      let infoWindow = new google.maps.InfoWindow();

      function createMarkers() {
        markers.forEach(marker => marker.setMap(null));

        console.log('scope results', $scope.results);

        markers = $scope.results.map(place => {
          const url = place.photos ? place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}) : 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/house-icon.png';

          const marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: {
              url: url,
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(45, 45)
            },
            title: place.name,
            optimized: false
          });

          // add mouseover event to each marker to display info window
          addInfoWindows(marker, place);

          return marker;
        });
      }

      function addInfoWindows(marker, place) {
        google.maps.event.addListener(marker, 'mouseover', function() {
          const html = `<b>${place.name}</b> <br/>${place.vicinity}<br/>Rating:${'🤩'.repeat(Math.floor(place.rating))}`;
          infoWindow.setContent(html);
          infoWindow.open(map, marker);
        });
      }

      // styling of the markers
      var myoverlay = new google.maps.OverlayView();
      myoverlay.draw = function () {
        //this assigns an id to the markerlayer Pane, so it can be referenced by CSS
        this.getPanes().markerLayer.id='markerLayer';
      };
      myoverlay.setMap(map);

      //set a watch on center change
      $scope.$watch('center', () => map.setCenter($scope.center), true);
      $scope.$watch('results', createMarkers, true);
    }
  };
}

export default googleMap;
