const mongoose = require('mongoose')

const Schema = mongoose.Schema

const weatherSchema = new Schema({
  latitude: {
    type: String,
    required: false
  },
  longitude: {
    type: String,
    required: false
  },
  cloud_pct: {
    type: String,
    required: false
  },
  temp: {
    type: Number,
    required: false
  },
  feels_like: {
    type: Number,
    required: false
  },
  humidity: {
    type: String,
    required: false
  },
  min_temp: {
    type: String,
    required: false
  },
  max_temp: {
    type: Number,
    required: false
  },
  wind_speed: {
    type: Number,
    required: false
  },
  wind_degrees: {
    type: String,
    required: false
  },
  sunrise: {
    type: Number,
    required: false
  },
  sunset: {
    type: String,
    required: false
  }, 
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Weather', weatherSchema)