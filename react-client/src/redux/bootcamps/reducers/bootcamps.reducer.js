import produce from 'immer';
import { DEFAULT_KEY, generateCacheTTL } from 'redux-cache';
import BootcampsActionTypes from '../bootcamps.type';

const initialState = {
  [DEFAULT_KEY]: null, // cache key
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

const bootcampsReducer = produce(
  (draftState, action) => {
    const { payload, receivedAt, type } = action;

    switch (type) {
      case BootcampsActionTypes.FETCH_BOOTCAMPS_START:
        draftState.loading = true;
        draftState.error = false;
        return;
      case BootcampsActionTypes.CREATE_BOOTCAMP_START:
        draftState.loading = true;
        return;
      case BootcampsActionTypes.CREATE_BOOTCAMP_SUCCESS: {
        const { careers, photo, user, name, id, _id } = payload.data;
        const newBootcamp = { careers, photo, user, name, id, _id };

        draftState.bootcampsData.data.unshift({ ...newBootcamp });
        draftState.loading = false;
        draftState.error = false;
        return;
      }
      case BootcampsActionTypes.CREATE_BOOTCAMP_FAILURE:
        draftState.loading = false;
        draftState.error = payload;
        return;
      case BootcampsActionTypes.FETCH_BOOTCAMPS_SUCCESS:
        draftState[DEFAULT_KEY] = generateCacheTTL();
        draftState.bootcampsData = payload;
        draftState.loading = false;
        draftState.error = false;
        draftState.lastUpdated = receivedAt;
        return;
      case BootcampsActionTypes.FETCH_BOOTCAMPS_FAILURE:
        draftState.loading = false;
        draftState.error = payload;
        return;
      default:
        return draftState;
    }
  },
  {
    ...initialState,
  },
);

export default bootcampsReducer;
