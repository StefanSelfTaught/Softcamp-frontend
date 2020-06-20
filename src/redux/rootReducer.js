import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from 'history';
import { setAutoFreeze } from 'immer';

import bootcampsReducer from 'redux/bootcamps/reducers/index';
import authReducer from 'redux/auth/auth.reducer';
import alertMessageReducer from 'redux/alertMessage/alertMessage.reducer';
import manageUserInfoReducer from 'redux/manageUserInfo/manageUserInfo.reducer';

setAutoFreeze(false);

export const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  blacklist: ['router'],
};

const rootReducer = combineReducers({
  router: connectRouter(history),
  bootcamps: bootcampsReducer,
  auth: authReducer,
  alertMessage: alertMessageReducer,
  manageUserInfo: manageUserInfoReducer,
});

export default persistReducer(persistConfig, rootReducer);
