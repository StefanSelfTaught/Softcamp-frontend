import { combineReducers } from 'redux';
import allBootcampsReducer from './bootcamps.reducer.js';
import bootcampDetailsReducer from './bootcampDetails.reducer.js';

const bootcampsReducer = combineReducers({
	allBootcamps: allBootcampsReducer,
	bootcampDetails: bootcampDetailsReducer
})

export default bootcampsReducer;