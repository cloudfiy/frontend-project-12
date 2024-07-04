import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.user = payload
      state.isAuthenticated = true
      state.error = null
    },
    loginFailure: (state, { payload }) => {
      state.user = null
      state.isAuthenticated = false
      state.error = payload
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },
  },
})

export const { loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer
