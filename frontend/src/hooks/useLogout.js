import { useAuthContext } from './useAuthContext'
import { useWorkoutsContext } from './useWorkoutsContext'
import { useWeathersContext } from './useWeathersContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchWorkouts } = useWorkoutsContext()
  const { dispatch: dispatchWeathers } = useWeathersContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchWorkouts({ type: 'SET_WORKOUTS', payload: null })
    dispatchWeathers({ type: 'SET_WEATHERS', payload: null })
  }

  return { logout }
}