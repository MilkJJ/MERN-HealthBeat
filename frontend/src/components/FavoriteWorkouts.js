import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoriteWorkouts = () => {
  const [favoriteWorkouts, setFavoriteWorkouts] = useState([]);
  const [workoutDetails, setWorkoutDetails] = useState([]);

  useEffect(() => {
    const fetchFavoriteWorkouts = async () => {
      try {
        // Make an API call to retrieve the favorite workout names from the backend
        const response = await axios.get('api/favorites/workouts');
        setFavoriteWorkouts(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchFavoriteWorkouts();
  }, []);

  // useEffect(() => {
  //   const fetchWorkoutDetails = async () => {
  //     try {
  //       // Make API calls to fetch workout details for each favorite workout
  //       const promises = favoriteWorkouts.map((workoutName) =>
  //         axios.get(`https://api.api-ninjas.com/v1/exercises?name=${workoutName}`, {
  //           headers: { 'X-Api-Key': 'bnti68Sbl82CWFtDBJVrMw==Xokfq027Qo5EKy4P' },
  //         })
  //       );

  //       const responses = await Promise.all(promises);
  //       const workoutDetails = responses.map((response) => response.data[0]);

  //       setWorkoutDetails(workoutDetails);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   if (favoriteWorkouts.length > 0) {
  //     fetchWorkoutDetails();
  //   }
  // }, [favoriteWorkouts]);

  return (
  <div style={{ textAlign: 'center', marginTop: "50px" }}>
    <h3>Favorite Workouts</h3>
    {workoutDetails.length === 0 ? (
      <p>No favorite workouts found.</p>
    ) : (
      workoutDetails.map((workout) => (
        <div key={workout._id} className="workout-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h4>{workout.name}</h4>
          <p>Type: {workout.type}</p>
          <p>Muscle Group: {workout.muscle}</p>
          <p>Equipment: {workout.equipment}</p>
          <p>Difficulty: {workout.difficulty}</p>
          <p>Instructions: {workout.instructions}</p>
        </div>
      ))
    )}
  </div>
);
};

export default FavoriteWorkouts;