import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    loading: false,
    verifying: true
  },
  reducers: {
    loadAuthStart: (state) => {
      state.loading = true
    },
    loadAuthFinish: (state) => {
      state.loading = false
    },
    verifyAuthStart: (state) => {
      state.verifying = true
    },
    verifyAuthFinish: (state) => {
      state.verifying = false
    },
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = {}
    }
  }
})

export const {
  loadAuthStart,
  loadAuthFinish,
  verifyAuthStart,
  verifyAuthFinish,
  login,
  logout
} = authSlice.actions
export default authSlice.reducer
