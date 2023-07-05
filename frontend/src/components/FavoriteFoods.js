import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FavoriteFoods = () => {
  const [favoriteFoods, setFavoriteFoods] = useState([]);

  useEffect(() => {
    const fetchFavoriteFoods = async () => {
      try {
        const response = await axios.get('/api/foods');
        setFavoriteFoods(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchFavoriteFoods();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: "50px" }}>
      <h3>Favorited Foods</h3>
      {favoriteFoods.length === 0 ? (
      <p>No favorite workouts found.</p>
    ) : (
      favoriteFoods.map((favoriteFoods) => (
        <div key={favoriteFoods.idMeal} className="workout-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h4>{favoriteFoods.strMeal}</h4>
        </div>
      ))
    )}
      
    </div>
  );
};

export default FavoriteFoods;
