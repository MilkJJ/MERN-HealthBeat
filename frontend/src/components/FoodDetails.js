import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Design/FoodDetails.css';

const FoodDetails = () => {
  const { id } = useParams();
  const [foodDetails, setFoodDetails] = useState(null);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        setFoodDetails(data.meals[0] || null);
        console.log('Successfully Connected!');
      } catch (error) {
        console.error(error);
      }
    };

    fetchFoodDetails();
  }, [id]);

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strArea,
    strInstructions
  } = foodDetails || {};

  const handleFav = async (e) => {
    console.log(foodDetails);
  }

  return (
    <div>
      <button className='fav-button' onClick={handleFav}>
          Add to Favorites
        </button>
        
        {foodDetails ? (
  <div className="food-details">
    <h2>Food Details:</h2>
    <div className="food-image">
      <img src={foodDetails.strMealThumb} alt={foodDetails.strMeal} />
      <p className="caption">{foodDetails.strMeal}</p>
    </div>
    <div className="food-card">
      <div className="food-info">
        <h3>Food: {foodDetails.strMeal}</h3>
        <p>Category: {foodDetails.strCategory}</p>
        <p>Tags : {foodDetails.strTags} </p>
        <p>Area: {foodDetails.strArea}</p>
        <p>Instructions: {foodDetails.strInstructions}</p>
        <h4>Ingredients:</h4>
        <div className="ingredients-table">
          <table>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Measurement</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(foodDetails).map((key) => {
                if (key.startsWith('strIngredient') && foodDetails[key]) {
                  const ingredientIndex = key.slice(13);
                  const ingredient = foodDetails[key];
                  const measurementKey = `strMeasure${ingredientIndex}`;
                  const measurement = foodDetails[measurementKey];
                  return (
                    <tr key={ingredientIndex}>
                      <td>{ingredient}</td>
                      <td>{measurement}</td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
) : (
  <p>Loading food details...</p>
)}


    </div>
  );
};

export default FoodDetails;
