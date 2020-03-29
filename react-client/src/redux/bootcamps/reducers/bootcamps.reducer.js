import { DEFAULT_KEY, generateCacheTTL } from 'redux-cache';
import BootcampsActionTypes from '../bootcamps.type';

const initialState = {
  [DEFAULT_KEY]: null,
  bootcampsData: {
    success: null,
    count: null,
    pagination: null,
    data: [],
  },
  loading: false,
  error: false,
  lastUpdated: null,
};

const bootcampsReducer = (state = initialState, action) => {
  const { payload, receivedAt, type } = action;

  switch (type) {
    case BootcampsActionTypes.FETCH_BOOTCAMPS_START:
      return {
        ...state,
        bootcampsData: {
          ...state.bootcampsData,
        },
        loading: true,
        error: false,
      };
    case BootcampsActionTypes.CREATE_BOOTCAMP_START:
      return {
        ...state,
        loading: true,
      };
    case BootcampsActionTypes.CREATE_BOOTCAMP_SUCCESS:
      return {
        ...state,
        bootcampsData: {
          ...state.bootcampsData,
          data: [...state.bootcampsData.data, payload.data],
        },
        loading: false,
        error: false,
      };
    case BootcampsActionTypes.CREATE_BOOTCAMP_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case BootcampsActionTypes.FETCH_BOOTCAMPS_SUCCESS:
      return {
        ...state,
        [DEFAULT_KEY]: generateCacheTTL(),
        bootcampsData: payload,
        loading: false,
        error: false,
        lastUpdated: receivedAt,
      };
    case BootcampsActionTypes.FETCH_BOOTCAMPS_FAILURE:
      return {
        ...state,
        bootcampsData: {
          ...state.bootcampsData,
        },
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default bootcampsReducer;
