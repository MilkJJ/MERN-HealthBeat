const Workout = require('../models/workoutModel');

const favoritesController = {
  saveFavoriteExercise: async (req, res) => {
    try {
      const { exerciseName } = req.params;
      const { userId } = req.session;

      const workout = await Workout.findOne({ name: exerciseName });
      if (!workout) {
        return res.status(404).json({ error: 'Workout not found' });
      }

      const favoriteWorkout = new Workout({
        name: workout.name,
        type: workout.type,
        muscle: workout.muscle,
        equipment: workout.equipment,
        difficulty: workout.difficulty,
        instructions: workout.instructions,
        favorite: true,
        user_id: userId
      });

      await favoriteWorkout.save();

      res.status(200).json({ message: 'Exercise saved as favorite' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while saving the favorite exercise' });
    }
  },

  getFavoriteExercises: async (req, res) => {
  try {
    // Retrieve all favorite exercises
    const favoriteExercises = await Workout.find();

    res.status(200).json(favoriteExercises);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the favorite exercises' });
  }
},
};

module.exports = favoritesController;