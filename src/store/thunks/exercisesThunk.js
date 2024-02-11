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

  fetch(`https://${HOST}/exercises?limit=${LIMIT}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': HOST
    }
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(getExercises(data))
    })
    .catch((error) => console.error(error))
    .finally(() => dispatch(loadExercisesFinish()))
}
