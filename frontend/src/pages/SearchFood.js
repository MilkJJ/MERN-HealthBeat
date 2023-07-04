import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Design/SearchFood.css';

const SearchFood = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [autoFillOptions, setAutoFillOptions] = useState([]);
  const [showAutoFill, setShowAutoFill] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          searchTerm
        )}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        setSearchResults(data.meals || []);
        console.log('Successfully Connected!');
      } catch (error) {
        console.error(error);
      }
    };

    if (searchTerm) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    // Fetch autofill options
    if (value.length > 2) {
      const fetchAutoFillOptions = async () => {
        try {
          const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
            value
          )}`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          const meals = data.meals || [];

          const options = meals.map((meal) => meal.strMeal);
          setAutoFillOptions(options);
        } catch (error) {
          console.error(error);
        }
      };

      fetchAutoFillOptions();
    } else {
      setAutoFillOptions([]);
    }
  };


  const handleAutoFillOptionClick = (option) => {
    setSearchTerm(option);
    setAutoFillOptions([]);
    setShowAutoFill(false);
  };

  const handleSearch = () => {
    navigate(`/food?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className='background'>
        <div>
            <h1 className='food-header'> Food Search </h1>
            <p className='food-p'> Complement your next workout with a great healthy meal! </p>
        </div>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search for food"
          className="search-input"
          onFocus={() => setShowAutoFill(true)}
          onBlur={() => setTimeout(() => setShowAutoFill(false), 200)}
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
        {showAutoFill && (
          <ul className="autofill-options">
            {autoFillOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleAutoFillOptionClick(option)}
                className="autofill-option"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    {/* Start */}
            <div class='header-search'>
              <h2>Search Results:</h2>
            </div>


            {searchResults.length > 0 && (
  <div className="search-results">
    {searchResults.map((result) => (
      <Link to={`/food/${result.idMeal}`} key={result.idMeal} className="search-result-card">
        {result.strMeal}
      </Link>
    ))}
  </div>
)}



  {/* End */}
    </div>
  );
};

export default SearchFood;
