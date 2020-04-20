import { push } from 'connected-react-router';
import BootcampsActionTypes from './bootcamps.type';
import axios from '../../utils/axiosInstance';
import { showAlertMessage } from '../alertMessage/alertMessage.actions';
import {
  selectBootcampDetails,
  selectBootcamps,
  selectFiltersApplied,
} from './bootcamps.selectors';

export const fetchbootcampDetailsStartAsync = (id) => async (dispatch, getState) => {
  // Comment
  const bootcamp = selectBootcampDetails(getState());

  if (bootcamp) {
    if (bootcamp._id === id) {
      return Promise.resolve();
    }
  }

  dispatch({
    type: BootcampsActionTypes.FETCH_BOOTCAMP_DETAILS_START,
  });

  try {
    const response = await axios.get(`/bootcamps/${id}`);
    const data = await response.data;

    dispatch({
      type: BootcampsActionTypes.FETCH_BOOTCAMP_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorResponse = error.response.data || 'Something went wrong';

    dispatch({
      type: BootcampsActionTypes.FETCH_BOOTCAMP_DETAILS_FAILURE,
      payload: errorResponse,
    });
  }
};

const fetchBootcampsStart = (withFilters) => ({
  type: BootcampsActionTypes.FETCH_BOOTCAMPS_START,
  withFilters,
});

const fetchBootcampsSuccess = (bootcamps) => ({
  type: BootcampsActionTypes.FETCH_BOOTCAMPS_SUCCESS,
  payload: bootcamps,
  receivedAt: Date.now(),
});

const fetchBootcampsFailure = (error) => ({
  type: BootcampsActionTypes.FETCH_BOOTCAMPS_FAILURE,
  payload: error,
});

export const fetchBootcampsStartAsync = (filters = null, forceRefresh = null) => async (
  dispatch,
  getState,
) => {
  if (
    selectBootcamps(getState()).length
    && !selectFiltersApplied(getState())
    && !filters
    && !forceRefresh
  ) {
    return Promise.resolve();
  }

  dispatch(fetchBootcampsStart(!!filters));

  const baseUrl = '/bootcamps?select=name,careers,averageCost,photo,id,user';
  let urlFilters;

  try {
    if (filters) {
      const {
        prices: [firstPrice, secondPrice],
        courses,
        otherFilters,
      } = filters;

      if (courses) {
        courses.forEach((course) => {
          urlFilters += `&careers[in]=${course}`;
        });
      }

      if (otherFilters) {
        otherFilters.forEach((otherFilter) => {
          urlFilters += `&${otherFilter}=${otherFilters.includes(otherFilter)}`;
        });
      }

      if (firstPrice) {
        urlFilters += `&averageCost[gte]=${firstPrice}&averageCost[lte]=${secondPrice}`;
      }

      const finalUrl = baseUrl + urlFilters.replace('undefined', '');

      const response = await axios.get(finalUrl);
      const data = await response.data;

      dispatch(fetchBootcampsSuccess(data));
      return;
    }

    const response = await axios.get(baseUrl);
    const data = await response.data;

    dispatch(fetchBootcampsSuccess(data));
  } catch (error) {
    const errorResponse = error.response.data || 'Something went wrong';

    dispatch(fetchBootcampsFailure(errorResponse));
  }
};

const createBootcampStart = () => ({
  type: BootcampsActionTypes.CREATE_BOOTCAMP_START,
});

const createBootcampSuccess = (bootcamp) => ({
  type: BootcampsActionTypes.CREATE_BOOTCAMP_SUCCESS,
  payload: bootcamp,
});

const createBootcampFailure = (error) => ({
  type: BootcampsActionTypes.CREATE_BOOTCAMP_FAILURE,
  payload: error,
});

export const createBootcampStartAsync = (bootcampData) => async (dispatch) => {
  dispatch(createBootcampStart());

  dispatch(showAlertMessage('Creating Bootcamp...', 'loading'));

  try {
    const response = await axios.post('/bootcamps', bootcampData, {
      'Content-Type': 'multipart/form-data',
    });

    const data = await response.data;

    dispatch(createBootcampSuccess(data));

    dispatch(showAlertMessage('Bootcamp Created', 'success'));

    dispatch(push('/bootcamps'));
  } catch (error) {
    const errorResponse = error.response.data || 'Something went wrong';

    dispatch(createBootcampFailure(errorResponse));

    dispatch(showAlertMessage(errorResponse, 'error'));
  }
};

const fetchUserBootcampsStart = () => ({
  type: BootcampsActionTypes.FETCH_USER_BOOTCAMPS_START,
});

const fetchUserBootcampsStartSuccess = (bootcamps) => ({
  type: BootcampsActionTypes.FETCH_USER_BOOTCAMPS_SUCCESS,
  payload: bootcamps,
});

const fetchUserBootcampsStartFailure = (error) => ({
  type: BootcampsActionTypes.FETCH_USER_BOOTCAMPS_FAILURE,
  payload: error,
});

export const fetchUserBootcampsStartAsync = () => async (dispatch) => {
  dispatch(fetchUserBootcampsStart());

  try {
    const response = await axios.get('/bootcamps/ownedBootcamps');

    const data = await response.data;

    dispatch(fetchUserBootcampsStartSuccess(data));
  } catch (error) {
    const errorResponse = error.response.data || 'Something went wrong';

    dispatch(fetchUserBootcampsStartFailure(errorResponse));

    dispatch(showAlertMessage(errorResponse.error, 'error'));
  }
};
