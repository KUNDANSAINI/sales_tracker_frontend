import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState:{},
  reducers: {
    LOGIN: (state, action) => {
      state.user= action.payload
    },
    LOGOUT: (state) => (state={})
  },
});

export const { LOGIN, LOGOUT } = userSlice.actions;
export default userSlice.reducer;