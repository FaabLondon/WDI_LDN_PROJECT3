/* global google */

directionsService.$inject = ['mapService', '$q'];

function directionsService(mapService, $q) {
  const directionsService = new google.maps.DirectionsService;
  const directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

  return {
    drawDirections(params) {
      //to link direction rendering to map
      directionsDisplay.setMap(mapService.get());

      return new $q((resolve, reject) => {
        //calls function to set route and directions
        directionsService.route(params, (results, status) => {
          if (status !== 'OK') return reject(status);
          directionsDisplay.setDirections(results);
          resolve(results);
        });
      });
    }
  };
}

export default directionsService;
