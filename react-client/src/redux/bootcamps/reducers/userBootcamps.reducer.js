import BootcampsActionTypes from '../bootcamps.type';

const initialState = {
  bootcampData: null,
  loading: false,
  error: false,
};

const userBootcampsReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case BootcampsActionTypes.FETCH_USER_BOOTCAMPS_START:
      return {
        ...state,
        bootcampData: null,
        loading: true,
        error: false,
      };
    case BootcampsActionTypes.FETCH_USER_BOOTCAMPS_SUCCESS:
      return {
        ...state,
        bootcampData: payload.data[0],
        loading: false,
        error: false,
      };
    case BootcampsActionTypes.FETCH_USER_BOOTCAMPS_FAILURE:
      return {
        ...state,
        bootcampData: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default userBootcampsReducer;
