//helper function singleton to be able to get one instance of the currentTrip in the whole app

function currentTrip() {
  let _currentTrip;

  return {
    set(currentTrip){
      _currentTrip = currentTrip;
    },
    get() {
      return _currentTrip;
    }
  };
}

export default currentTrip;
