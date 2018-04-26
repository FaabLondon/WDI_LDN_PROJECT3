/* global google */

directionsService.$inject = ['mapService', '$q'];

//We build our own promise
//we return an object that has a method drawDirections that returns a promise wich we can then handle with then or catch

function directionsService(mapService, $q) {
  const directionsService = new google.maps.DirectionsService;
  const directionsDisplay = new google.maps.DirectionsRenderer(); //removed {suppressMarkers: true}

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
    },
    clearMap() {
      directionsDisplay.setMap(null);
    }
  };
}

export default directionsService;
