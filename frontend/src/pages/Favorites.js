import React, { useState, useContext } from 'react';
import FavoriteWorkouts from '../components/FavoriteWorkouts';
import FavoriteFoods from '../components/FavoriteFoods';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [selectedSection, setSelectedSection] = useState('workouts');
  const [favoriteFoods, setFavoriteFoods] = useState([]);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  ;

  return (
  <div>

    <h1 style={{ fontSize: '50px', textAlign: 'center' }}>Favorites</h1>
    <div style={{ textAlign: 'center' }}>
      <div className="sections">
        <button
          className={selectedSection === 'workouts' ? 'active' : ''}
          onClick={() => handleSectionChange('workouts')}
          style={{
            fontSize: '18px',
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: selectedSection === 'workouts' ? 'lightblue' : 'transparent',
            color: selectedSection === 'workouts' ? 'black' : 'grey',
            border: '2px solid black',
            marginRight: '10px'
          }}
        >
          Workouts
        </button>

        <button
          className={selectedSection === 'foods' ? 'active' : ''}
          onClick={() => handleSectionChange('foods')}
          style={{
            fontSize: '18px',
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: selectedSection === 'nutrition' ? 'lightblue' : 'transparent',
            color: selectedSection === 'foods' ? 'black' : 'grey',
            border: '2px solid black',
            marginRight: '10px'
          }}
        >
          Nutrition
        </button>

        <button
          className={selectedSection === 'songs' ? 'active' : ''}
          onClick={() => handleSectionChange('songs')}
          style={{
            fontSize: '18px',
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: selectedSection === 'songs' ? 'lightblue' : 'transparent',
            color: selectedSection === 'songs' ? 'black' : 'grey',
            border: '2px solid black'
          }}
        >
          Songs
        </button>
      </div>
    </div>

    {selectedSection === 'workouts' && <FavoriteWorkouts />}
    {selectedSection === 'foods' && <FavoriteFoods />}
    {/* Add conditional rendering for other sections */}
  </div>
);
};

export default Favorites;