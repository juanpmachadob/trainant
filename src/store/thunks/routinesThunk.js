import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import {
  createRoutine,
  getCurrentRoutine,
  getRoutines,
  loadRoutinesFinish,
  loadRoutinesStart,
  updateRoutine
} from '@/store/slices/routinesSlice'
import { showAlert } from '@/utils/alerts'

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
        // Cross the exercises data (API) with the exercises from the new routine
        const crossExercises = Object.fromEntries(
          Object.keys(newRoutine.exercises).map((day) => [
            day,
            newRoutine.exercises[day].map((exercise) => ({
              ...exercise,
              ...routine.exercises[day].find((ex) => ex.id === exercise.id)
            }))
          ])
        )

        dispatch(createRoutine({ ...newRoutine, exercises: crossExercises }))
        showAlert({
          title: 'Routine created',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
          willClose: () => {
            if (callback) callback(routineRef.id)
          }
        })
      })
      .catch((error) => console.error(error))
      .finally(() => dispatch(loadRoutinesFinish()))
  }

export const updateRoutineRequest =
  (routine, callback) => (dispatch, getState) => {
    dispatch(loadRoutinesStart())

    const { user } = getState().auth
    const routineRef = doc(db, `users/${user.id}/routines/${routine.id}`)

    const newRoutine = {
      ...routine,
      id: routineRef.id,
      updatedAt: new Date().toISOString(),
      exercises: Object.fromEntries(
        Object.keys(routine.exercises).map((day) => [
          day,
          routine.exercises[day].map((exercise) => ({
            id: exercise.id,
            currentSets: exercise.currentSets || 0,
            currentRepetitions: exercise.currentRepetitions || 0,
            currentWeight: exercise.currentWeight || 0,
            notes: exercise.notes || ''
          }))
        ])
      )
    }

    setDoc(routineRef, newRoutine)
      .then(() => {
        // Cross the exercises data (API) with the exercises from the new routine
        const crossExercises = Object.fromEntries(
          Object.keys(newRoutine.exercises).map((day) => [
            day,
            newRoutine.exercises[day].map((exercise) => ({
              ...exercise,
              ...routine.exercises[day].find((ex) => ex.id === exercise.id)
            }))
          ])
        )

        dispatch(updateRoutine({ ...newRoutine, exercises: crossExercises }))
        showAlert({
          title: 'Routine updated',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
          willClose: () => {
            if (callback) callback(routineRef.id)
          }
        })
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
      const { initialExercises } = getState().exercises
      const routines = []

      querySnapshot.forEach((document) => {
        const docData = document.data()
        // Cross the exercises data (API) with the exercises from the routine (DB)
        const crossExercises = Object.fromEntries(
          Object.keys(docData.exercises).map((day) => [
            day,
            docData.exercises[day].map((exercise) => {
              const newExercise = initialExercises.find(
                (ex) => ex.id === exercise.id
              )
              return { ...newExercise, ...exercise }
            })
          ])
        )

        routines.push({
          ...docData,
          exercises: crossExercises,
          id: document.id
        })
      })

      dispatch(getRoutines(routines))
    })
    .catch((error) => console.error(error))
    .finally(() => dispatch(loadRoutinesFinish()))
}

export const getRoutineByIdRequest = (id, navigate) => (dispatch, getState) => {
  dispatch(loadRoutinesStart())

  const { initialLoad, routines, currentRoutine } = getState().routines
  if (currentRoutine.id === id) {
    dispatch(loadRoutinesFinish())
    return
  }

  if (initialLoad) {
    const routine = routines.find((routine) => routine.id === id)
    dispatch(getCurrentRoutine(routine))
    dispatch(loadRoutinesFinish())
    return
  }

  const { user } = getState().auth
  const routineRef = doc(db, `users/${user.id}/routines/${id}`)

  getDoc(routineRef)
    .then((document) => {
      if (!document.exists()) navigate('/404')

      const { initialExercises } = getState().exercises
      const docData = document.data()

      // Cross the exercises data (API) with the exercises from the routine (DB)
      const crossExercises = Object.fromEntries(
        Object.keys(docData.exercises).map((day) => [
          day,
          docData.exercises[day].map((exercise) => {
            const newExercise = initialExercises.find(
              (ex) => ex.id === exercise.id
            )
            return { ...newExercise, ...exercise }
          })
        ])
      )

      const routine = {
        ...docData,
        exercises: crossExercises,
        id: document.id
      }
      dispatch(getCurrentRoutine(routine))
    })
    .catch((error) => console.error(error))
    .finally(() => dispatch(loadRoutinesFinish()))
}
