import { createSelector } from 'reselect';

const bootcampsData = state => state.bootcamps.allBootcamps;
const bootcampDetailsData = state => state.bootcamps.bootcampDetails;

export const selectBootcampDetails = createSelector(
	[bootcampDetailsData],
	bootcamp => bootcamp.bootcampData
)

export const selectBootcamps = createSelector(
	[bootcampsData],
	bootcamps => bootcamps.bootcampsData.data
);

export const selectBootcampsError = createSelector(
	[bootcampsData],
	bootcamps => bootcamps.error
);

export const selectLoading = createSelector(
	[bootcampsData],
	bootcamps => bootcamps.loading
);

// export const selectBootcampDetails = bootcampUrlParam =>
// 	createSelector([selectBootcamps], bootcamps => {
// 		return bootcamps.find(bootcamp => {
// 			return bootcamp.id === bootcampUrlParam;
// 		});
// 	});
