import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import {
  createRoutine,
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
