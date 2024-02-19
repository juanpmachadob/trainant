import { createSlice } from '@reduxjs/toolkit'

const routinesSlice = createSlice({
  name: 'routines',
  initialState: {
    initialLoad: false,
    loading: false,
    routines: [],
    currentRoutine: {}
  },
  reducers: {
    loadRoutinesStart: (state) => {
      state.loading = true
    },
    loadRoutinesFinish: (state) => {
      state.loading = false
    },
    getRoutines: (state, { payload }) => {
      state.routines = payload
      state.initialLoad = true
    },
    getCurrentRoutine: (state, { payload }) => {
      state.currentRoutine = payload
    },
    createRoutine: (state, { payload }) => {
      state.routines.push(payload)
    },
    updateRoutine: (state, { payload }) => {
      const index = state.routines.findIndex(
        (routine) => routine.id === payload.id
      )
      state.routines[index] = payload
      state.currentRoutine = payload
    }
  }
})

export const {
  loadRoutinesStart,
  loadRoutinesFinish,
  getRoutines,
  getCurrentRoutine,
  createRoutine,
  updateRoutine
} = routinesSlice.actions
export default routinesSlice.reducer
