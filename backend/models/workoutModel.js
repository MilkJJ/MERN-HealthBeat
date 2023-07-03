const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  muscle: {
    type: String,
    required: true
  },
  equipment: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  favorite: {
    type: Boolean,
    required: false
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)