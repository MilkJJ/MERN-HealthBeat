import React, { useState } from 'react';
import axios from 'axios';
import { Link,   } from 'react-router-dom';
import ExerciseDetails from '../components/ExerciseDetails';

function MuscleGroups() {
  const muscleGroups = [
    'abdominals',
    'abductors',
    'adductors',
    'biceps',
    'calves',
    'chest',
    'forearms',
    'glutes',
    'hamstrings',
    'lats',
    'lower_back',
    'middle_back',
    'neck',
    'quadriceps',
    'traps',
    'triceps'
  ];
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
  const [exercises, setExercises] = useState([]);

  const handleMuscleGroupChange = async (event) => {
    const muscle = event.target.value;
    setSelectedMuscleGroup(muscle); // Update the selectedMuscleGroup state

    if (muscle) {
      try {
        const url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;
        const response = await axios.get(url, { headers: { 'X-Api-Key': 'bnti68Sbl82CWFtDBJVrMw==Xokfq027Qo5EKy4P' } });
        setExercises(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
  <div>
    <h1 style={{ fontSize: '50px', textAlign: 'center' }}>Muscle Groups</h1>
    <div style={{ textAlign: 'center' }}>
      <button
        style={{
          fontSize: '18px',
          padding: '10px 20px',
          borderRadius: '5px',
          backgroundColor: 'lightblue',
          color: 'black',
          marginBottom: '30px'
        }}
      >
        <Link to="/favorites" style={{ textDecoration: 'none', color: 'black' }}>Favorites Page</Link>
      </button>
    </div>
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <select
          value={selectedMuscleGroup}
          onChange={handleMuscleGroupChange}
          style={{ fontSize: '15px', padding: '15px', borderRadius: '5px' }}
        >
          <option value="">Select a muscle group</option>
          {muscleGroups.map((muscleGroup) => (
            <option key={muscleGroup} value={muscleGroup}>
              {muscleGroup}
            </option>
          ))}
        </select>
        <button
          onClick={handleMuscleGroupChange}
          style={{
            marginLeft: '10px',
            fontSize: '18px',
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: 'lightgreen',
            color: 'black'
          }}
        >
          Fetch Exercises
        </button>
      </div>
    </div>
    {exercises.length > 0 && (
      <div style={{ textAlign: 'center' }}>
        <h2>Exercises</h2>
        <ul style={{ margin: '0 auto', maxWidth: '400px' }}>
          {exercises.map((exercise) => (
            <li key={exercise.name}>
              <Link to={`/exercises/${exercise.name}`}>
                {exercise.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);
}

export default MuscleGroups;