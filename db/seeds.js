const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Place = require('../models/trip');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  Place.create([{
    name: 'Big Ben',
    address: 'Westminster, London SW1A 0AA',
    location: {
      lat: 51.500828,
      lng: -0.124636
    },
    image: 'https://cdn.images.express.co.uk/img/dynamic/139/590x/secondary/Big-Ben-1034726.jpg',
    description: 'The Houses of Parliament and Elizabeth Tower, commonly called Big Ben, are among London\'s most iconic landmarks and must-see London attractions. Technically, Big Ben is the name given to the massive bell inside the clock tower, which weighs more than 13 tons (13,760 kg).  The clock tower looks spectacular at night when the four clock faces are illuminated.',
    rating: 4
  }, {
    name: 'London Eye',
    address: 'Lambeth, London SE1 7PB',
    location: {
      lat: 51.503337,
      lng: -0.119542
    },
    image: 'https://cdn.images.express.co.uk/img/dynamic/139/590x/secondary/Big-Ben-1034726.jpg',
    description: 'The London Eye is a giant Ferris wheel on the South Bank of the River Thames in London. The structure is 443 feet tall and the wheel has a diameter of 394 feet. When it opened to the public in 2000 it was the world\'s tallest Ferris wheel.',
    rating: 4.5
  }])
    .then(places => console.log(`${places.length} places created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
