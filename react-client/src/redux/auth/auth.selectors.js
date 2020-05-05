import { createSelector } from 'reselect';

const auth = (state) => state.auth;

export const selectUserData = createSelector(
  auth,
  (auth) => auth.userData,
);

export const selectUserId = createSelector(
  auth,
  (auth) => auth.userData.id,
);

export const selectIsAuthenticated = createSelector(
  auth,
  (auth) => auth.isAuthenticated,
);

export const selectError = createSelector(auth, (auth) => auth.error);

export const selectLoading = createSelector(
  auth,
  (auth) => auth.loading,
);
