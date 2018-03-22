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
