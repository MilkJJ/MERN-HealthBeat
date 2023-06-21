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
  const {title, load, reps} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!load) {
    emptyFields.push('load')
  }
  if(!reps) {
    emptyFields.push('reps')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const weather = await Weather.create({title, load, reps, user_id})
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