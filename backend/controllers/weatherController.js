const Weather = require('../models/weatherModel')
const mongoose = require('mongoose')

// get all weathers
const getWeathers = async (req, res) => {
  const user_id = req.user._id

  const weathers = await Weather.find({user_id}).sort({createdAt: -1})

  res.status(200).json(weathers)
}

// get a single weather
const getWeather = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such weather'})
  }

  const weather = await Weather.findById(id)

  if (!weather) {
    return res.status(404).json({error: 'No such weather'})
  }
  
  res.status(200).json(weather)
}


// create new weather
const createWeather = async (req, res) => {
  const {latitude, longitude, cloud_pct, temp, feels_like, humidity, min_temp, max_temp, wind_speed, wind_degrees, sunrise, sunset} = req.body

  let emptyFields = []

  if(!latitude) {
    emptyFields.push('latitude')
  }
  if(!longitude) {
    emptyFields.push('longitude')
  }
  if(!cloud_pct) {
    emptyFields.push('cloud_pct')
  }
  if(!temp) {
    emptyFields.push('temp')
  }
  if(!feels_like) {
    emptyFields.push('feels_like')
  }
  if(!humidity) {
    emptyFields.push('humidity')
  }
  if(!min_temp) {
    emptyFields.push('min_temp')
  }
  if(!max_temp) {
    emptyFields.push('max_temp')
  }
  if(!wind_speed) {
    emptyFields.push('wind_speed')
  }
  if(!wind_degrees) {
    emptyFields.push('wind_degrees')
  }
  if(!sunrise) {
    emptyFields.push('sunrise')
  }
  if(!sunset) {
    emptyFields.push('sunset')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const weather = await Weather.create({latitude, longitude, cloud_pct, temp, feels_like, humidity, min_temp, max_temp, wind_speed, wind_degrees, sunrise, sunset, user_id})
    res.status(200).json(weather)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a weather
const deleteWeather = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such weather'})
  }

  const weather = await Weather.findOneAndDelete({_id: id})

  if (!weather) {
    return res.status(400).json({error: 'No such weather'})
  }

  res.status(200).json(weather)
}

// update a weather
const updateWeather = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such weather'})
  }

  const weather = await Weather.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!weather) {
    return res.status(400).json({error: 'No such weather'})
  }

  res.status(200).json(weather)
}


module.exports = {
  getWeathers,
  getWeather,
  createWeather,
  deleteWeather,
  updateWeather
}