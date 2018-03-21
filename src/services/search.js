/* global google */

searchService.$inject = ['mapService', '$q'];
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
