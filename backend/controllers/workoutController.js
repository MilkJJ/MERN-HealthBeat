const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')
const axios = require('axios');
const API_KEY = 'bnti68Sbl82CWFtDBJVrMw==Xokfq027Qo5EKy4P';

// get all workouts
const getExercises = async (req, res) => {
  const muscle = req.params.muscle;
  const url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;

  try {
    const response = await axios.get(url, { headers: { 'X-Api-Key': API_KEY } });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the exercises.' });
  }
}

// get a single workout
const getWorkout = async (req, res) => {
  const name = decodeURIComponent(req.params.name);
  const apiNinja = `https://api.api-ninjas.com/v1/exercises?name=${name}`;

  try {
    const response = await axios.get(apiNinja, { headers: { 'X-Api-Key': API_KEY } });
    const exercise = response.data.find(exercise => exercise.name === name);

    if (!exercise) {
      console.log(`Exercise not found: ${name}`);
      console.log('Available exercises:', response.data.map(e => e.name));
      res.status(404).send("Exercise not found. :(");
      return;
    }

    res.status(200).json(exercise);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while fetching the exercise.');
  }
};


module.exports = {
  //getMuscleGroups,
  getExercises,
  getWorkout,
  // createWorkout,
  // deleteWorkout,
  // updateWorkout
}