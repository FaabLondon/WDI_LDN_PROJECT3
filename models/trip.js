const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  image: { type: String },
  description: { type: String },
  rating: { type: Number, min: 1, max: 5 }
});


const daySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  places: [placeSchema]
});

const tripSchema = new mongoose.Schema({
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  startDay: { type: Date, required: true },
  days: [daySchema]
});


module.exports = mongoose.model('Trip', tripSchema);
module.exports = mongoose.model('Day', daySchema);
module.exports = mongoose.model('Place', placeSchema);
