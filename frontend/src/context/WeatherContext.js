import { createContext, useReducer } from 'react'

export const WeathersContext = createContext()

export const weathersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WEATHERS': 
      return {
        weathers: action.payload
      }
    case 'CREATE_WEATHER':
      return {
        weathers: [action.payload, ...state.weathers]
      }
    case 'DELETE_WEATHER':
      return {
        weathers: state.weathers.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const WeathersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weathersReducer, {
    weathers: null
  })

  return (
    <WeathersContext.Provider value={{...state, dispatch}}>
      { children }
    </WeathersContext.Provider>
  )
}