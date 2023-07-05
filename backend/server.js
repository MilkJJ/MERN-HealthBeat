require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const weatherRoutes = require('./routes/weathers')
const addToFavouritesRouter = require('./routes/addToFavouritesRouter')
const foodRoutes = require ('./routes/foodRoutes');
const Food = require('./models/foodModel');
const foodController = require('./controllers/foodController')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
app.use('/api/weathers', weatherRoutes)
app.get('/api/foods', foodController.getAllFoods);

// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  // listen for requests
  app.listen(process.env.PORT, () => {
    console.log('Connected to DB & listening on port', process.env.PORT)
  })
})
.catch((error) => {
  console.log(error)
})

.then(() => {
  console.log('Connected to MongoDB');

  // Retrieve all foods from the "foods" collection using the controller
  return foodController.getAllFoods()
  .then((foods) => {
    console.log('Foods Found!');
    // Process the retrieved data as needed
    
  })
  .catch((error) => {
    console.error('Error:', error);
  })
  .finally(() => {
    // Close the database connection using the controller
    foodController.closeDatabaseConnection();
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
})

// Kavi's
app.use('/api', addToFavouritesRouter);


// Darshy's Song API.

// Define a schema for the song
const songSchema = new mongoose.Schema({
  name: String,
  artist: String,
  album: String,
});

//song api
app.post('/api/songs', (req, res) => {
  const { name, artist, email } = req.body;

  // Create a new song document
  const song = new Song({ name, artist, email });

  // Save the song to the database
  song.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to save song to the database' });
    } else {
      res.status(200).json({ message: 'Song saved successfully' });
    }
  });
});

const Song = mongoose.model('Song', songSchema);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = { Food };






