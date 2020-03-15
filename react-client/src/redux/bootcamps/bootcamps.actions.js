import BootcampsActionTypes from './bootcamps.type.js';
import axios from '../../utils/axiosInstance.js';
import { selectBootcamps, selectBootcampDetails } from './bootcamps.selectors.js';

const fetchBootcampsStart = () => ({
	type: BootcampsActionTypes.FETCH_BOOTCAMPS_START
});

const fetchBootcampsSuccess = bootcamps => ({
	type: BootcampsActionTypes.FETCH_BOOTCAMPS_SUCCESS,
	payload: bootcamps
});

const fetchBootcampsFailure = error => ({
	type: BootcampsActionTypes.FETCH_BOOTCAMPS_FAILURE,
	payload: error
});

export const fetchbootcampDetailsStartAsync = id => {
	return async (dispatch, getState) => {

		// Comment
		if(selectBootcampDetails(getState())._id === id) {
			return Promise.resolve();
		}

		dispatch({
			type: BootcampsActionTypes.FETCH_BOOTCAMP_DETAILS_START
		});

		try {
			const response = await axios.get(`/bootcamps/${id}`);
			const data = await response.data;

			dispatch({
				type: BootcampsActionTypes.FETCH_BOOTCAMP_DETAILS_SUCCESS,
				payload: data
			});
			
		} catch (error) {
			const errorResponse = error.response.data || 'Something went wrong';

			dispatch({
				type: BootcampsActionTypes.FETCH_BOOTCAMP_DETAILS_FAILURE,
				payload: errorResponse
			});
		}
	};
};

export const fetchBootcampsStartAsync = () => {
	return async (dispatch, getState) => {

		if(selectBootcamps(getState()).length) {
			return Promise.resolve();
		}

		dispatch(fetchBootcampsStart());

		try {
			const response = await axios.get('/bootcamps');
			const data = await response.data;

			dispatch(fetchBootcampsSuccess(data));
			
		} catch (error) {
			const errorResponse = error.response.data || 'Something went wrong';

			dispatch(fetchBootcampsFailure(errorResponse));
		}
	};
};







