import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  token: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      const { username, token } = payload
      state.username = username
      state.token = token
    },
    logout: (state) => {
      state.username = null
      state.token = null
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
