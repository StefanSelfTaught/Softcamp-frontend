import { createSelector } from 'reselect';
import { selectUserId } from '../auth/auth.selectors';

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
