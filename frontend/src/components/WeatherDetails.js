import { useWeathersContext } from '../hooks/useWeathersContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WeatherDetails = ({ weather }) => {
  const { dispatch } = useWeathersContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/weathers/' + weather._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WEATHER', payload: json})
    }
  }

  return (
    <div className="weather-details">
      <img src="http://openweathermap.org/img/wn/10d@4x.png" alt="Weather description"/>
      <h4>Latitude {weather.latitude} ‎ ‎ ‎  | ‎ ‎ ‎ Longitude {weather.longitude}</h4>
      <p><strong>Cloud PCT: </strong>{weather.cloud_pct} %</p>
      <p><strong>Temperature: </strong>{weather.temp} °C</p>
      <p><strong>Feels Like: </strong>{weather.feels_like} °C</p>
      <p><strong>Humidity: </strong>{weather.humidity} %</p>
      <p><strong>Min Temp: </strong>{weather.min_temp} °C</p>
      <p><strong>Max Temp: </strong>{weather.max_temp} °C</p>
      <p><strong>Wind Speed: </strong>{weather.wind_speed} m/s</p>
      <p><strong>Wind Degrees: </strong>{weather.wind_degrees} °</p>
      <p><strong>Sunrise: </strong>{weather.sunrise} UNIX </p>
      <p><strong>Sunset: </strong>{weather.sunset} UNIX </p>
      <br></br>
      <p>Date: {weather.createdAt}</p>
      <p>{formatDistanceToNow(new Date(weather.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WeatherDetails