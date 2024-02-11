import { createSlice } from '@reduxjs/toolkit'

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
      state.exercises = payload
      state.initialLoad = true
    }
  }
})

export const { loadExercisesStart, loadExercisesFinish, getExercises } =
  exercisesSlice.actions
export default exercisesSlice.reducer
