/* global google */

directionsService.$inject = ['mapService', '$q'];

function directionsService(mapService, $q) {

  return {
    drawDirections(params) {
      // const placeService = new google.maps.places.PlacesService(mapService.get());
      const directionsService = new google.maps.DirectionsService;
      const directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
      //to link direction rendering to map
      directionsDisplay.setMap(mapService.get());

      return new $q((resolve, reject) => {
        //calls function to set route and directions
        directionsService.route(params, (results, status) => {
          if (status !== 'OK') return reject(status);
          // code to display route in a panel - need to define a DOM element to display it in
          directionsDisplay.setDirections(results);
          resolve(results);
        });
      });
    }
  };
}

export default directionsService;
