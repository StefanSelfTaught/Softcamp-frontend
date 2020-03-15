import BootcampsActionTypes from '../bootcamps.type.js';

const initialState = {
	loading: false,
	bootcampData: [],
	error: false
}

const bootcampDetailsReducer = (state = initialState, action) => {

	const { payload, type } = action;

	switch(type) {
		case BootcampsActionTypes.FETCH_BOOTCAMP_DETAILS_START:
			return {
				...state,
				loading: true,
			}
		case BootcampsActionTypes.FETCH_BOOTCAMP_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				bootcampData: payload.data,
				error: false
			}
		case BootcampsActionTypes.FETCH_BOOTCAMP_DETAILS_FAILURE:
			return {
				...state,
				loading: false,
				bootcampData: [],
				error: payload
			}
		default:
			return state

	}

}

export default bootcampDetailsReducer;