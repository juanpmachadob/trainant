import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import {
  createRoutine,
  getRoutines,
  loadRoutinesFinish,
  loadRoutinesStart
} from '@/store/slices/routinesSlice'

export const createRoutineRequest =
  (routine, callback) => (dispatch, getState) => {
    dispatch(loadRoutinesStart())

    const { user } = getState().auth
    const routineRef = doc(collection(db, `users/${user.id}/routines`))

    const newRoutine = {
      ...routine,
      id: routineRef.id,
      createdAt: new Date().toISOString(),
      exercises: Object.fromEntries(
        Object.keys(routine.exercises).map((day) => [
          day,
          routine.exercises[day].map((exercise) => ({
            id: exercise.id,
            currentSets: 0,
            currentRepetitions: 0,
            currentWeight: 0,
            notes: ''
          }))
        ])
      )
    }

    setDoc(routineRef, newRoutine)
      .then(() => {
        dispatch(createRoutine(newRoutine))
        if (callback) callback()
      })
      .catch((error) => console.error(error))
      .finally(() => dispatch(loadRoutinesFinish()))
  }

export const getRoutinesRequest = () => (dispatch, getState) => {
  dispatch(loadRoutinesStart())

  // This is to avoid getting the routines again
  const { initialLoad } = getState().routines
  if (initialLoad) {
    dispatch(loadRoutinesFinish())
    return
  }

  const { user } = getState().auth
  const routinesRef = collection(db, `users/${user.id}/routines`)

  getDocs(routinesRef)
    .then((querySnapshot) => {
      const routines = []
      querySnapshot.forEach((doc) =>
        routines.push({ id: doc.id, ...doc.data() })
      )

      dispatch(getRoutines(routines))
    })
    .catch((error) => console.error(error))
    .finally(() => dispatch(loadRoutinesFinish()))
}
