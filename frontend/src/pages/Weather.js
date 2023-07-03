import { useEffect }from 'react'
import { useWeathersContext } from "../hooks/useWeathersContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WeatherDetails from '../components/WeatherDetails'
import WeatherForm from '../components/WeatherForm'

const Weather = () => {
  const {weathers, dispatch} = useWeathersContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchWeathers = async () => {
      const response = await fetch('/api/weathers', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WEATHERS', payload: json})
      }
    }

    if (user) {
      fetchWeathers()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="weathers">
        {weathers && weathers.map((weather) => (
          <WeatherDetails key={weather._id} weather={weather} />
        ))}
      </div>
      <WeatherForm />
    </div>
  )
}

export default Weather