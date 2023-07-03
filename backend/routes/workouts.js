const express = require('express')
const {
  //getMuscleGroups,
  getExercises,
  getWorkout,
  
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')
const favoritesController = require('../controllers/favoritesController');

const router = express.Router()

// GET all exercises for a muscle group
router.get('/exercises/:muscle', getExercises)

// GET a single exercise
router.get('/exercise/:name', getWorkout)

// Route to retrieve favorited exercises
router.get('/favorites/workouts', favoritesController.getFavoriteExercises);

// Route to save a workout as favorite
router.post('/exercises/save', favoritesController.saveFavoriteExercise); //:exerciseName

module.exports = router