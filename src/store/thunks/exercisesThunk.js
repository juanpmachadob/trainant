import dayjs from 'dayjs'
import {
  getExercises,
  loadExercisesFinish,
  loadExercisesStart
} from '@/store/slices/exercisesSlice'

const HOST = import.meta.env.VITE_EXERCISE_DB_HOST
const API_KEY = import.meta.env.VITE_EXERCISE_DB_API_KEY

// Limit 1500 because of the free API plan.
// I prefer to store all the exercises in the store and filter them for each user,
// instead of exceeding the limit by making individual requests for each user's exercises.
const LIMIT = 1500

export const getExercisesRequest = () => (dispatch, getState) => {
  dispatch(loadExercisesStart())

  const { initialLoad } = getState().exercises
  if (initialLoad) {
    dispatch(loadExercisesFinish())
    return
  }

  // Verify if the exercisesDate is the same as today
  const exercisesDate = localStorage.getItem('exercisesDate')
  if (exercisesDate === dayjs().format('YYYY-MMM-DD')) {
    // If the exercisesDate is the same as today, get the exercises from localStorage
    try {
      const exercises = JSON.parse(localStorage.getItem('exercises'))

      // If there are exercises in localStorage, dispatch them and finish the request
      if (exercises.length > 0) {
        console.log('Exercises loaded from the LS')
        dispatch(getExercises(exercises))
        dispatch(loadExercisesFinish())
        return
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Get exercises from the API
  fetch(`https://${HOST}/exercises?limit=${LIMIT}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': HOST
    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        // Set exercisesDate and exercises in localStorage to avoid unnecessary requests (only if is the same day)
        localStorage.setItem('exercisesDate', dayjs().format('YYYY-MMM-DD'))
        localStorage.setItem('exercises', JSON.stringify(data))

        console.log('Exercises loaded from the API')
        dispatch(getExercises(data))
        return
      }
      throw new Error('No exercises found')
    })
    .catch((error) => console.error(error))
    .finally(() => dispatch(loadExercisesFinish()))
}
