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
      <h4>{weather.title}</h4>
      <p><strong>Load (kg): </strong>{weather.load}</p>
      <p><strong>Reps: </strong>{weather.reps}</p>
      <p>{formatDistanceToNow(new Date(weather.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WeatherDetails