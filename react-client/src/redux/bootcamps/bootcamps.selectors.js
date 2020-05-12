import { createSelector } from 'reselect';
import { selectUserId } from 'redux/auth/auth.selectors';

const bootcampsData = (state) => state.bootcamps.allBootcamps;
const userBootcamp = (state) => state.bootcamps.userBootcamps;
const bootcampDetailsData = (state) =>
  state.bootcamps.bootcampDetails;

export const selectBootcampDetails = createSelector(
  bootcampDetailsData,
  (bootcamp) => bootcamp.bootcampData,
);

export const selectBootcamps = createSelector(
  bootcampsData,
  (bootcamps) => bootcamps.bootcampsData.data,
);

export const selectLowestAverageBootcampPrice = createSelector(
  bootcampsData,
  (bootcamps) =>
    Math.min(
      ...bootcamps.bootcampsData.data.map(
        (bootcamp) => bootcamp.averageCost,
      ),
    )
      .toString()
      .split('')
      .map((digit, index) => {
        if (index > 0) return parseInt(digit, 10) - digit;
        return parseInt(digit, 10);
      })
      .join(''),
);

export const selectHighestAverageBootcampPrice = createSelector(
  bootcampsData,
  (bootcamps) =>
    Math.max(
      ...bootcamps.bootcampsData.data.map(
        (bootcamp) => bootcamp.averageCost,
      ),
    )
      .toString()
      .split('')
      .map((digit, index) => {
        if (index > 0) return parseInt(digit, 10) - digit;
        return parseInt(digit, 10) + 1;
      })
      .join(''),
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
  (bootcamps, userId) =>
    bootcamps.find((bootcamp) => bootcamp.user === userId),
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

export const selectBootcampsCount = createSelector(
  bootcampsData,
  (bootcamps) => bootcamps.bootcampsData.totalItems,
);

export const selectBootcampsPage = createSelector(
  bootcampsData,
  (bootcamps) => bootcamps.currentPage,
);

export const selectUserBootcampId = createSelector(
  userBootcamp,
  (userBootcamp) => userBootcamp.bootcampData.id,
);
