import { combineReducers } from 'redux';
import allBootcampsReducer from './bootcamps.reducer';
import bootcampDetailsReducer from './bootcampDetails.reducer';

const bootcampsReducer = combineReducers({
  allBootcamps: allBootcampsReducer,
  bootcampDetails: bootcampDetailsReducer,
});

export default bootcampsReducer;
