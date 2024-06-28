import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './stateSlice';

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers as needed
});

export default rootReducer;