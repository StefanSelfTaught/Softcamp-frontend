import { combineReducers } from 'redux';

import bootcampDetailsReducer from 'redux/bootcamps/reducers/bootcampDetails.reducer';
import userBootcampsReducer from 'redux/bootcamps/reducers/userBootcamps.reducer';
import allBootcampsReducer from 'redux/bootcamps/reducers/bootcamps.reducer';

const bootcampsReducer = combineReducers({
  bootcampDetails: bootcampDetailsReducer,
  userBootcamps: userBootcampsReducer,
  allBootcamps: allBootcampsReducer,
});

export default bootcampsReducer;
