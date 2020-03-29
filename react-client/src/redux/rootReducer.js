import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from 'history';

import bootcampsReducer from './bootcamps/reducers/index';
import authReducer from './auth/auth.reducer';
import alertMessageReducer from './alertMessage/alertMessage.reducer';
import manageUserInfoReducer from './manageUserInfo/manageUserInfo.reducer';
import allBootcampsReducer from './bootcamps/reducers/bootcamps.reducer';

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
  allBootcamps: allBootcampsReducer,
  auth: authReducer,
  alertMessage: alertMessageReducer,
  manageUserInfo: manageUserInfoReducer,
});

export default persistReducer(persistConfig, rootReducer);
