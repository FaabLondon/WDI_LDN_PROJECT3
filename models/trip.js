const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  image: { type: String},
  description: { type: String},
  rating: { type: Number, min: 1, max: 5 },
  googleId: { type: String, required: true }
});


const daySchema = new mongoose.Schema({
  date: { type: Date },
  places: [placeSchema]
});

const tripSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.ObjectId, ref: 'User'},
  location: { type: String },
  startDate: { type: Date },
  image: {type: String},
  coordinates: {
    lat: { type: Number},
    lng: { type: Number}
  },
  days: [daySchema]
});


module.exports = mongoose.model('Trip', tripSchema);
