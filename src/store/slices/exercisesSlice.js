import { createSlice } from '@reduxjs/toolkit'
import { EXERCISE_PARTS_OBJECT } from '@/utils/constants'

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

      if (type === EXERCISE_PARTS_OBJECT.BODY_PART) {
        state.exercises = state.initialExercises.filter(
          (exercise) => exercise.bodyPart === part
        )
      }
      if (type === EXERCISE_PARTS_OBJECT.TARGET) {
        state.exercises = state.initialExercises.filter(
          (exercise) => exercise.target === part
        )
      }
    }
  }
})

export const { loadExercisesStart, loadExercisesFinish, getExercises, getExercisesByPart } =
  exercisesSlice.actions
export default exercisesSlice.reducer
