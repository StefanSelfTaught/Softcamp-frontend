import { createSelector } from 'reselect';

const manageUserInfo = (state) => state.manageUserInfo;

export const selectDrawerShow = createSelector(
  manageUserInfo,
  manageUserInfo => manageUserInfo.accountDrawerShow,
);

export const selectModalShow = createSelector(
  manageUserInfo,
  manageUserInfo => manageUserInfo.forgetPasswordModalShow,
);

export const selectForgotPasswordEmailSent = createSelector(
  manageUserInfo,
  manageUserInfo => manageUserInfo.forgotPasswordEmailSent,
);

export const selectError = createSelector(
  manageUserInfo,
  manageUserInfo => manageUserInfo.error,
);

export const selectLoading = createSelector(
  manageUserInfo,
  manageUserInfo => manageUserInfo.loading,
);
