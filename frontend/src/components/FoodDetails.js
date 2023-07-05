import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import '../Design/FoodDetails.css';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FoodDetails = () => {
  const { id } = useParams();
  const [foodDetails, setFoodDetails] = useState(null);
  const { user } = useContext(AuthContext);

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

  const { idMeal,
    dateModified,
    strArea,
    strCategory,
    strCreativeCommonsConfirmed,
    strDrinkAlternate,
    strImageSource,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
    strIngredient16,
    strIngredient17,
    strIngredient18,
    strIngredient19,
    strIngredient20,
    strInstructions,
    strMeal,
    strMealThumb,
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strMeasure6,
    strMeasure7,
    strMeasure8,
    strMeasure9,
    strMeasure10,
    strMeasure11,
    strMeasure12,
    strMeasure13,
    strMeasure14,
    strMeasure15,
    strMeasure16,
    strMeasure17,
    strMeasure18,
    strMeasure19,
    strMeasure20,
    strSource,
    strTags,
    strYoutube,
    email } = foodDetails || {};

  const handleAddToFavorites = async () => {
    console.log(foodDetails);

    try {
      const foodData = {
        idMeal,
        dateModified,
        strArea,
        strCategory,
        strCreativeCommonsConfirmed,
        strDrinkAlternate,
        strImageSource,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strIngredient14,
        strIngredient15,
        strIngredient16,
        strIngredient17,
        strIngredient18,
        strIngredient19,
        strIngredient20,
        strInstructions,
        strMeal,
        strMealThumb,
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
        strMeasure9,
        strMeasure10,
        strMeasure11,
        strMeasure12,
        strMeasure13,
        strMeasure14,
        strMeasure15,
        strMeasure16,
        strMeasure17,
        strMeasure18,
        strMeasure19,
        strMeasure20,
        strSource,
        strTags,
        strYoutube,
        email: user.email
      };
      
      await axios.post('/api/add-to-favorites', foodData);
      // Show a success toast notification
      toast.success(foodDetails.strMeal + ' was saved successfully!', {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error) {
      console.error('Error:', error);
      // Show an error toast notification
      toast.error('Failed to save!', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  return (
    <div>
      <button className='fav-button' onClick={handleAddToFavorites}>
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
