/* global google */
googleDirections.$inject = ['Trip', '$scope'];

function googleDirections(Trip, $scope) {
  return {
    restrict: 'C',
    template: '<div class="google-directions"></div>', //change to directions-panel?
    replace: true,

    link($element) {
      let response;
      //receives updated directions from our Trip service
      $scope.$on('Directions updated', (e, directions) => {
        console.log('received directions:', directions);
        response = directions;
      });

      //console.log($element);
      var route = response.routes[0];
      $element[0].innerHTML = '';
      //For each route, display summary information.
      for (let i = 0; i < route.legs.length; i++) {
        let routeSegment = i + 1;
        $element[0].innerHTML += '<b>Route Segment: ' + routeSegment +
            '</b><br>';
        $element[0].innerHTML += route.legs[i].start_address + ' to ';
        $element[0].innerHTML += route.legs[i].end_address + '<br>';
        $element[0].innerHTML += route.legs[i].distance.text + '<br><br>';
      }
    }
  };
}

export default googleDirections;

// var summaryPanel = document.getElementById('directions-panel');
// summaryPanel.innerHTML = '';
// // For each route, display summary information.
// for (var i = 0; i < route.legs.length; i++) {
//   var routeSegment = i + 1;
//   summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
//       '</b><br>';
//   summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
//   summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
//   summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
//}
