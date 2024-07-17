import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      const { username, token } = payload;
      return { ...state, username, token };
    },
    logout: (state) => {
      return { ...state, username: null, token: null };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
