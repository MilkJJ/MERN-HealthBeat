import { useState } from "react"
import { useWeathersContext } from "../hooks/useWeathersContext"
import { useAuthContext } from '../hooks/useAuthContext'

const WeatherForm = () => {
  const { dispatch } = useWeathersContext()
  const { user } = useAuthContext()

  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleFetchAndSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/weather?lat=${latitude}&lon=${longitude}`, {
        headers: {
          'X-Api-Key': 'cTh9lJF+wBF2fXu5Z4Sa7A==KeUVABVjSteMQ9ij',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      });
  
      if (!response.ok) {
        throw new Error('Request failed: ' + response.status);
      }
  
      const data = await response.json();
  
      const weather = {
        latitude,
        longitude,
        cloud_pct: data.cloud_pct,
        temp: data.temp,
        feels_like: data.feels_like,
        humidity: data.humidity,
        min_temp: data.min_temp,
        max_temp: data.max_temp,
        wind_speed: data.wind_speed,
        wind_degrees: data.wind_degrees,
        sunrise: data.sunrise,
        sunset: data.sunset 
      };
  
      const postResponse = await fetch('/api/weathers', {
        method: 'POST',
        body: JSON.stringify(weather),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });
  
      if (!postResponse.ok) {
        throw new Error('Request failed: ' + postResponse.status);
      }
  
      // Clear form fields and perform necessary actions
      setLatitude('');
      setLongitude('');
  
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_WEATHER', payload: await postResponse.json() });
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };
  
const handleGetCurrentWeather = () => {
    navigator.geolocation.getCurrentPosition(
    (position) => {

  // Get the latitude and longitude values from current location
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  setLatitude(latitude);
  setLongitude(longitude);
  
  },
  (error) => {
    console.error('Error retrieving current position:', error);
  }
);
}


  return (
    <form className="create" onSubmit={handleFetchAndSubmit}>
      <h3>Get Current Weather</h3>

      <label>Latitude:</label>
      <input 
        type="number" //text
        onChange={(e) => setLatitude(e.target.value)}
        value={latitude}
        className={emptyFields.includes('latitude') ? 'error' : ''}
      />

      <label>Longitude: </label>
      <input 
        type="number"
        onChange={(e) => setLongitude(e.target.value)}
        value={longitude}
        className={emptyFields.includes('longitude') ? 'error' : ''}
      />

      <button type="button" onClick={handleGetCurrentWeather}>
        Get Current Coords
      </button>
      <br></br><br></br>
      <button type="submit">
        Get Weather Info
      </button>
      

      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WeatherForm