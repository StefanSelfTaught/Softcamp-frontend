import { createSelector } from 'reselect';

const router = (state) => state.router;

const selectPathName = createSelector(
  router,
  (router) => router.location.pathname,
);

export default selectPathName;
