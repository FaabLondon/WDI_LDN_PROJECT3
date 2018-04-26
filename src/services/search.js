/* global google */
searchService.$inject = ['mapService', '$q'];

//We build our own promise
//we return an object that has a method nearby that returns a promise wich we can then handle with then or catch

function searchService(mapService, $q) {

  return {
    nearby(params) {
      const placeService = new google.maps.places.PlacesService(mapService.get());

      return new $q((resolve, reject) => {
        placeService.nearbySearch(params, (results, status) => {
          if(status !== google.maps.places.PlacesServiceStatus.OK) return reject(status);
          resolve(results);
        });

      });
    }
  };
}

export default searchService;
