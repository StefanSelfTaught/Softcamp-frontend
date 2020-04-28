import { createSelector } from 'reselect';
import { selectUserId } from 'redux/auth/auth.selectors';

const bootcampsData = (state) => state.bootcamps.allBootcamps;
const bootcampDetailsData = (state) => state.bootcamps.bootcampDetails;

export const selectBootcampDetails = createSelector(
  bootcampDetailsData,
  (bootcamp) => bootcamp.bootcampData,
);

export const selectBootcamps = createSelector(
  bootcampsData,
  (bootcamps) => bootcamps.bootcampsData.data,
);

export const selectFiltersApplied = createSelector(
  bootcampsData,
  (bootcamps) => bootcamps.filtersApplied,
);

export const selectLastUpdated = createSelector(
  bootcampsData,
  (bootcamps) => bootcamps.lastUpdated,
);

export const selectBootcampMatchUser = createSelector(
  [selectBootcamps, selectUserId],
  (bootcamps, userId) => bootcamps.find((bootcamp) => bootcamp.user === userId),
);

export const selectBootcampsError = createSelector(
  bootcampsData,
  (bootcamps) => bootcamps.error,
);

export const selectBootcampsLoading = createSelector(
  bootcampsData,
  (bootcamps) => bootcamps.loading,
);

export const selectBootcampDetailsLoading = createSelector(
  bootcampDetailsData,
  (bootcamps) => bootcamps.loading,
);

export const selectBootcampDetailsError = createSelector(
  bootcampDetailsData,
  (bootcamps) => bootcamps.error,
);

// export const selectBootcampDetails = bootcampUrlParam =>
// createSelector([selectBootcamps], bootcamps => {
// return bootcamps.find(bootcamp => {
// return bootcamp.id === bootcampUrlParam;
// });
// });

export const selectAveragePriceState = createSelector(
  bootcampsData,
  (bootcamps) => bootcamps.filters.averagePriceState,
);

export const selectAveragePriceFilter = createSelector(
  bootcampsData,
  (bootcamps) => bootcamps.filters.averagePrice,
);

export const selectCareersFilter = createSelector(
  bootcampsData,
  (bootcamps) => bootcamps.filters.careers,
);

export const selectOtherFilters = createSelector(
  bootcampsData,
  (bootcamps) => bootcamps.filters.otherFilters,
);

export const selectBootcampsSorting = createSelector(
  bootcampsData,
  (bootcamps) => bootcamps.sorting,
);
