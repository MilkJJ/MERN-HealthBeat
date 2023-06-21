const mongoose = require('mongoose')

const Schema = mongoose.Schema

const weatherSchema = new Schema({
  cloud_pct: {
    type: String,
    required: true
  },
  temp: {
    type: Number,
    required: true
  },
  feels_like: {
    type: Number,
    required: true
  },
  humidity: {
    type: String,
    required: true
  },
  min_temp: {
    type: String,
    required: true
  },
  max_temp: {
    type: Number,
    required: true
  },
  wind_speed: {
    type: Number,
    required: true
  },
  wind_degrees: {
    type: String,
    required: true
  },
  sunrise: {
    type: Number,
    required: true
  },
  sunset: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Weather', weatherSchema)