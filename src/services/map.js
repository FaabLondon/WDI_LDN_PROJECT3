mapService.$inject = ['$rootScope'];

//helper function singleton to be able to get one instance of the map in the whole app

function mapService($rootScope) {
  let _map;

  return {
    set(map){
      _map = map;
      $rootScope.$broadcast('map:set');
    },
    get() {
      return _map;
    },
    destroy() {
      _map = null;
      $rootScope.$broadcast('map:destroyed');
    }
  };
}

export default mapService;
