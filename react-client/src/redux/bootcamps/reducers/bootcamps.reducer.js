import produce from 'immer';
import BootcampsActionTypes from 'redux/bootcamps/bootcamps.type';

const initialState = {
  bootcampsData: {
    success: null,
    count: null,
    pagination: null,
    data: [],
  },
  sorting: '-createdAt',
  filters: {
  	averagePriceState: true,
    averagePrice: [],
    careers: [],
    otherFilters: [],
  },
  filtersApplied: false,
  loading: false,
  error: false,
  lastUpdated: null,
};

const bootcampsReducer = produce(
  (draftState, action) => {
    const { payload, receivedAt, type, withFilters } = action;

    switch (type) {
      case BootcampsActionTypes.SET_AVERAGE_PRICE_FILTER:
        draftState.filters.averagePrice[0] = payload.firstPrice;
        draftState.filters.averagePrice[1] = payload.secondPrice;
        return;
     	case BootcampsActionTypes.TOGGLE_AVERAGE_PRICE_FILTER:
     		draftState.filters.averagePriceState = payload;
     		return;
      case BootcampsActionTypes.SET_CAREERS_FILTER:
        draftState.filters.careers = payload;
        return;
      case BootcampsActionTypes.SET_OTHER_FILTERS:
        draftState.filters.otherFilters = payload;
        return;
      case BootcampsActionTypes.SORT_BOOTCAMPS:
        draftState.sorting = payload;
        return;
      case BootcampsActionTypes.FETCH_BOOTCAMPS_START:
        draftState.loading = true;
        draftState.error = false;
        draftState.filtersApplied = withFilters;
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
