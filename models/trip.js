const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  startDay: { type: Date, required: true },
  days: [daySchema]
});

const daySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  places: [placeSchema]
});

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


module.exports = {
  Trip: mongoose.model('Trip', tripSchema),
  Day: mongoose.model('Day', daySchema),
  Place: mongoose.model('Place', placeSchema)
};
