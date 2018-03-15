const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String },
  address: { type: String },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  image: { type: String },
  description: { type: String },
  rating: { type: Number, min: 1, max: 5 }
});


const daySchema = new mongoose.Schema({
  date: { type: Date },
  places: [placeSchema]
});

const tripSchema = new mongoose.Schema({
  location: { type: String },
  startDay: { type: Date },
  days: [daySchema]
});


module.exports = {
  Trip: mongoose.model('Trip', tripSchema),
  Day: mongoose.model('Day', daySchema),
  Place: mongoose.model('Place', placeSchema)
};
