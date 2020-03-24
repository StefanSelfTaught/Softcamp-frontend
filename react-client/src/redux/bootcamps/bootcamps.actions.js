import { push } from 'connected-react-router';
import BootcampsActionTypes from './bootcamps.type';
import axios from '../../utils/axiosInstance';
import { showAlertMessage } from '../alertMessage/alertMessage.actions';
import { selectBootcampDetails } from './bootcamps.selectors';

export const fetchbootcampDetailsStartAsync = (id) => async (dispatch, getState) => {
  // Comment
  if (selectBootcampDetails(getState())._id === id) {
    return Promise.resolve();
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

  return true;
};


const fetchBootcampsStart = () => ({
  type: BootcampsActionTypes.FETCH_BOOTCAMPS_START,
});

const fetchBootcampsSuccess = (bootcamps) => ({
  type: BootcampsActionTypes.FETCH_BOOTCAMPS_SUCCESS,
  payload: bootcamps,
});

const fetchBootcampsFailure = (error) => ({
  type: BootcampsActionTypes.FETCH_BOOTCAMPS_FAILURE,
  payload: error,
});

export const fetchBootcampsStartAsync = () => async dispatch => {
  // if(selectBootcamps(getState()).length) {
  // return Promise.resolve();
  // }

  dispatch(fetchBootcampsStart());

  try {
    const selectFields = 'select=name,careers,averageCost,photo,id,user';

    const response = await axios.get(`/bootcamps?${selectFields}`);
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

export const createBootcampStartAsync = (bootcampData) => async dispatch => {
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
