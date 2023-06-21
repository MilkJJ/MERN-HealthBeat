const express = require('express')
const {
  createWeather,
  getWeathers,
  getWeather,
  deleteWeather,
  updateWeather
} = require('../controllers/weatherController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all weather routes
router.use(requireAuth)

// GET all weathers
router.get('/', getWeathers)

//GET a single weather
router.get('/:id', getWeather)

// POST a new weather
router.post('/', createWeather)

// DELETE a weather
router.delete('/:id', deleteWeather)

// UPDATE a weather
router.patch('/:id', updateWeather)


module.exports = router