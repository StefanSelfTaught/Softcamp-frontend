import { combineReducers } from 'redux';

import bootcampDetailsReducer from './bootcampDetails.reducer';
import userBootcampsReducer from './userBootcamps.reducer';

const bootcampsReducer = combineReducers({
  bootcampDetails: bootcampDetailsReducer,
  userBootcamps: userBootcampsReducer,
});

export default bootcampsReducer;
