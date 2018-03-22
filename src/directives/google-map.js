/* global google */
googleMap.$inject = ['mapService', 'currentTripService'];
function googleMap(mapService, currentTripService) {

  return {
    restrict: 'E',
    template: '<div class="google-map"></div>',
    replace: true,
    scope: {
      center: '=',
      zoom: '=',
      results: '=?',
      trip: '=?'
    },
    link($scope, $element) {
      //create new map
      const map = new google.maps.Map($element[0], {
        center: $scope.center,
        zoom: $scope.zoom, //zoom not working
        mapTypeId: google.maps.MapTypeId.ROADMAP //mapTypeId not working
      });

      let markers = [];
      let tripMarkers = [];

      mapService.set(map);
      const infoWindow = new google.maps.InfoWindow();

      function createMarkers() {
        //removes all markers from map
        markers.forEach(marker => marker.setMap(null));
        tripMarkers.forEach(marker => marker.setMap(null));

        //sets all markers from search results
        markers = $scope.results.map(place => {
          const marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            title: place.name,
            optimized: false
          });
          // add mouseover event to each marker to display info window
          addInfoWindows(marker, place);
          return marker;
        });
        console.log(currentTripService.get());

        //sets all markers from current trip so that markers still shows on route in different filter
        if (!currentTripService.get()) return false; //if trip not defined yet
        //should be appending to markers
        tripMarkers = currentTripService.get().days[0].places.map(place => {

          const marker = new google.maps.Marker({
            map: map,
            position: place.location,
            title: place.name,
            optimized: false
          });
          // add mouseover event to each marker to display info window
          addInfoWindows(marker, place);
          return marker;
        });
      }

      function addInfoWindows(marker, place) {
        let url = place.photos ? place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}) : 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/house-icon.png';
        url = place.image ? place.image : url; //in case of DB place , not google place

        marker.addListener('mouseover', () => {
          const html = `<div class="infowindow">
            <h4 class="title is-5">${place.name.substr(0, 25)}</h4>
            <div class="image" style="background-image: url(${url})"></div>
            <h5 class="title is-6">${place.vicinity || place.address}</h5>
            Rating:${'🤩'.repeat(Math.floor(place.rating))}
          </div>
          `;
          infoWindow.setContent(html);
          infoWindow.open(map, marker);
        });
      }

      // styling of the markers
      // var myoverlay = new google.maps.OverlayView();
      // myoverlay.draw = function () {
      //   //this assigns an id to the markerlayer Pane, so it can be referenced by CSS
      //   this.getPanes().markerLayer.id='markerLayer';
      // };
      // myoverlay.setMap(map);

      //set a watch on center change
      $scope.$watch('center', () => map.setCenter($scope.center), true);
      $scope.$watch('results', createMarkers, true);
    }
  };
}

export default googleMap;
