import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Route, Switch, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ExerciseDetails component
const ExerciseDetails = () => {
  const { exerciseName  } = useParams();
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get(`https://api.api-ninjas.com/v1/exercises?name=${exerciseName}`,
         { headers: { 'X-Api-Key': 'bnti68Sbl82CWFtDBJVrMw==Xokfq027Qo5EKy4P' }});
        setExercise(response.data[0]);
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchExercise();
  }, [exerciseName]);

const handleFavorite = async () => {
  //const { userId } = req.session;
    try {
      // Create a workout object to save in MongoDB
      const workout = {
        name: exercise.name,
        type: exercise.type,
        muscle: exercise.muscle,
        equipment: exercise.equipment,
        difficulty: exercise.difficulty,
        instructions: exercise.instructions,
        favorite: true,
        user_id: "userId" // Replace 'user_id' with the actual user ID
      };

      // Make an API call to save the workout in MongoDB
      const response = await axios.post('api/workouts/exercises/save', workout);
      console.log(response.data);

      // Show a success toast notification
      toast.success('Exercise saved successfully!', {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error) {
      console.error('Error:', error);
      // Show an error toast notification
      toast.error('Failed to save exercise!', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  if (!exercise) {
    return <div>Loading...</div>;
  }

   return (
    <>
      <div className="exercise-details">
        <h4 style={{ fontSize: '50px', textAlign: 'center' }}>{exercise.name}</h4>
        <p style={{ fontSize: '25px', textAlign: 'center' }}><strong>Type: </strong>{exercise.type}</p>
        <p style={{ fontSize: '25px', textAlign: 'center' }}><strong>Muscle Group: </strong>{exercise.muscle}</p>
        <p style={{ fontSize: '25px', textAlign: 'center' }}><strong>Equipment: </strong>{exercise.equipment}</p>
        <p style={{ fontSize: '25px', textAlign: 'center' }}><strong>Difficulty: </strong>{exercise.difficulty}</p>
        <p style={{ fontSize: '25px', textAlign: 'center' }}><strong>Instructions: </strong>{exercise.instructions}</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          style={{
            fontSize: '18px',
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: 'lightblue',
            color: 'black'
          }}
          onClick={handleFavorite}
        >
          Add to Favorites
        </button>
      </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ExerciseDetails;