import BootcampsActionTypes from '../bootcamps.type.js';

const initialState = {
	loading: false,
	bootcampsData: {
		success: null,
		count: null,
		pagination: null,
		data: []
	},
	error: false
}

const bootcampsReducer = (state = initialState, action) => {

	const { payload, type } = action;

	switch(type) {
		case BootcampsActionTypes.FETCH_BOOTCAMPS_START:
			return {
				...state,
				loading: true,
			}
		case BootcampsActionTypes.FETCH_BOOTCAMPS_SUCCESS:
			return {
				...state,
				loading: false,
				bootcampsData: payload,
				error: false
			}
		case BootcampsActionTypes.FETCH_BOOTCAMPS_FAILURE:
			return {
				...state,
				loading: false,
				bootcampsData: [],
				error: payload
			}
		default:
			return state

	}

}

export default bootcampsReducer;