import { push } from 'connected-react-router';
import BootcampsActionTypes from 'redux/bootcamps/bootcamps.type';
import axios from 'utils/axiosInstance';
import { showAlertMessage } from 'redux/alertMessage/alertMessage.actions';
import {
  selectBootcampDetails,
  selectBootcamps,
  selectBootcampsLoading,
  selectUserBootcampId,
} from 'redux/bootcamps/bootcamps.selectors';

export const setBootcampsPage = (page) => ({
  type: BootcampsActionTypes.SET_BOOTCAMPS_PAGE,
  payload: page,
});

export const addAveragePriceFilter = (firstPrice, secondPrice) => ({
  type: BootcampsActionTypes.ADD_AVERAGE_PRICE_FILTER,
  payload: {
    firstPrice,
    secondPrice,
  },
});

export const toggleAveragePriceFilter = (value) => ({
  type: BootcampsActionTypes.TOGGLE_AVERAGE_PRICE_FILTER,
  payload: value,
});

export const addCareersFilter = (filterData) => ({
  type: BootcampsActionTypes.ADD_CAREERS_FILTER,
  payload: filterData,
});

export const addOtherFilters = (filterData) => ({
  type: BootcampsActionTypes.ADD_OTHER_FILTERS,
  payload: filterData,
});

export const sortBootcamps = (sortBy) => ({
  type: BootcampsActionTypes.SORT_BOOTCAMPS,
  payload: sortBy,
});

export const fetchbootcampDetailsStartAsync = (id) => async (
  dispatch,
  getState,
) => {
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

export const fetchBootcampsStartAsync = (
  filters = null,
  sort = '-createdAt',
  paginate = null,
  forceRefresh = null,
) => async (dispatch, getState) => {
  // let withFilters = filters;

  // for (let key in withFilters) {
  //   if (!!withFilters[key].length) {
  //     withFilters = true;
  //     break;
  //   } else {
  //     withFilters = null;
  //   }
  // }

  if (
    selectBootcamps(getState()).length &&
    !forceRefresh &&
    !filters &&
    !paginate
  ) {
    return Promise.resolve();
  }

  if (selectBootcampsLoading(getState())) {
    return Promise.resolve();
  }

  dispatch(fetchBootcampsStart(!!filters));

  const baseUrl = `/bootcamps?select=name,careers,averageCost,photo,id,user&sort=${sort}`;

  let urlFilters = '';

  try {
    if (filters) {
      const {
        prices: [firstPrice, secondPrice],
        careers,
        otherFilters,
      } = filters;

      if (careers) {
        careers.forEach((course) => {
          urlFilters += `&careers[in]=${course}`;
        });
      }

      if (otherFilters) {
        otherFilters.forEach((otherFilter) => {
          urlFilters += `&${otherFilter}=${otherFilters.includes(
            otherFilter,
          )}`;
        });
      }

      if (firstPrice) {
        urlFilters += `&averageCost[gte]=${firstPrice}&averageCost[lte]=${secondPrice}`;
      }

      if (paginate) {
        urlFilters += `&page=${paginate}`;
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

export const createBootcampStartAsync = (
  bootcampData,
  addNextCourses,
) => async (dispatch, getState) => {
  dispatch(createBootcampStart());

  dispatch(showAlertMessage('Creating Bootcamp...', 'loading'));

  try {
    const response = await axios.post('/bootcamps', bootcampData, {
      'Content-Type': 'multipart/form-data',
    });

    const data = await response.data;

    dispatch(createBootcampSuccess(data));

    dispatch(showAlertMessage('Bootcamp Created', 'success'));

    const userBootcampId = selectUserBootcampId(getState());

    if (addNextCourses) {
      dispatch(push(`./manage-bootcamp/${userBootcampId}/courses`));
    } else {
      dispatch(push('/bootcamps'));
    }
  } catch (error) {
    const errorResponse = error.response.data || 'Something went wrong';

    dispatch(createBootcampFailure(errorResponse));

    dispatch(showAlertMessage(errorResponse, 'error'));
  }
};

const createBootcampCoursesStart = () => ({
  type: BootcampsActionTypes.CREATE_BOOTCAMP_COURSES_START,
});

const createBootcampCoursesSuccess = (courses) => ({
  type: BootcampsActionTypes.CREATE_BOOTCAMP_COURSES_SUCCESS,
  payload: courses,
});

const createBootcampCoursesFailure = (error) => ({
  type: BootcampsActionTypes.CREATE_BOOTCAMP_COURSES_FAILURE,
  payload: error,
});

export const createBootcampCoursesStartAsync = (
  bootcampId,
  coursesData,
) => async (dispatch) => {
  dispatch(createBootcampCoursesStart());

  dispatch(showAlertMessage('Creating Course/s...', 'loading'));

  try {
    const response = await axios.post(
      `/bootcamps/${bootcampId}/courses`,
      coursesData,
      {
        'Content-Type': 'application/json',
      },
    );

    const data = await response.data;

    dispatch(createBootcampCoursesSuccess(data));

    dispatch(showAlertMessage('Course/s Created', 'success'));

    dispatch(push('/bootcamps'));
  } catch (error) {
    const errorResponse = error.response.data || 'Something went wrong';

    dispatch(createBootcampCoursesFailure(errorResponse));

    dispatch(showAlertMessage(errorResponse, 'error'));
  }
};

const fetchUserBootcampsStart = () => ({
  type: BootcampsActionTypes.FETCH_USER_BOOTCAMPS_START,
});

const fetchUserBootcampsSuccess = (bootcamps) => ({
  type: BootcampsActionTypes.FETCH_USER_BOOTCAMPS_SUCCESS,
  payload: bootcamps,
});

const fetchUserBootcampsFailure = (error) => ({
  type: BootcampsActionTypes.FETCH_USER_BOOTCAMPS_FAILURE,
  payload: error,
});

export const fetchUserBootcampsStartAsync = () => async (dispatch) => {
  dispatch(fetchUserBootcampsStart());

  try {
    const response = await axios.get('/bootcamps/ownedBootcamps');

    const data = await response.data;

    dispatch(fetchUserBootcampsSuccess(data));
  } catch (error) {
    const errorResponse = 'Something went wrong';

    // const errorResponse = error.response.data || 'Something went wrong';

    dispatch(fetchUserBootcampsFailure(errorResponse));

    dispatch(showAlertMessage(errorResponse, 'error'));
  }
};

const deleteUserBootcampSuccess = () => ({
  type: BootcampsActionTypes.DELETE_USER_BOOTCAMP_SUCCESS,
});

const deleteUserBootcampFailure = (error) => ({
  type: BootcampsActionTypes.DELETE_USER_BOOTCAMP_FAILURE,
  payload: error,
});

export const deleteUserBootcampStartAsync = (userBootcampId) => async (
  dispatch,
) => {
  try {
    await axios.delete(`/bootcamps/${userBootcampId}`);

    dispatch(deleteUserBootcampSuccess());

    dispatch(push('/bootcamps'));

    dispatch(showAlertMessage('Bootcamp deleted!', 'success'));
  } catch (error) {
    const errorResponse = 'Something went wrong';

    // const errorResponse = error.response.data || 'Something went wrong';

    dispatch(deleteUserBootcampFailure(errorResponse));

    dispatch(showAlertMessage(errorResponse, 'error'));
  }
};
