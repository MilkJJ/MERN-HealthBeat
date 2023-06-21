import { WeathersContext } from '../context/WeatherContext'
import { useContext } from 'react'

export const useWeathersContext = () => {
  const context = useContext(WeathersContext)

  if (!context) {
    throw Error('useWeathersContext must be used inside an WeathersContextProvider')
  }

  return context
}