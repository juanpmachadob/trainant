import { createSlice } from '@reduxjs/toolkit'
import { EXERCISE_PARTS_OBJECT } from '@/utils/constants'

const getFilterByPart = (type, part) => {
  if (type === EXERCISE_PARTS_OBJECT.BODY_PART) {
    return (exercise) => exercise.bodyPart === part
  }
  if (type === EXERCISE_PARTS_OBJECT.TARGET) {
    return (exercise) => exercise.target === part
  }
}

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: {
    initialLoad: false,
    loading: false,
    initialExercises: [],
    exercises: []
  },
  reducers: {
    loadExercisesStart: (state) => {
      state.loading = true
    },
    loadExercisesFinish: (state) => {
      state.loading = false
    },
    getExercises: (state, { payload }) => {
      state.initialExercises = payload
      state.initialLoad = true
    },
    getExercisesByPart: (state, { payload }) => {
      const { type, part } = payload
      state.exercises = state.initialExercises.filter(
        getFilterByPart(type, part)
      )
    },
    searchExercises: (state, { payload }) => {
      const { term, type, part } = payload
      const searchTerm = term.toLowerCase()

      state.exercises = state.initialExercises.filter(
        (exercise) =>
          (exercise.name.toLowerCase().includes(searchTerm) ||
            exercise.equipment.toLowerCase().includes(searchTerm)) &&
          getFilterByPart(type, part)(exercise)
      )
    }
  }
})

export const {
  loadExercisesStart,
  loadExercisesFinish,
  getExercises,
  getExercisesByPart,
  searchExercises
} = exercisesSlice.actions
export default exercisesSlice.reducer
