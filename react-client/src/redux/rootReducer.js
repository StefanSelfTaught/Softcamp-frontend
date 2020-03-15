import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { createBrowserHistory } from 'history'

import bootcampsReducer from './bootcamps/reducers/index.js';
import authReducer from './auth/auth.reducer.js';
import alertMessageReducer from './alertMessage/alertMessage.reducer.js';

export const history = createBrowserHistory()

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth'],
	blacklist: ['router']
}

const rootReducer = combineReducers({
	router: connectRouter(history),
	bootcamps: bootcampsReducer,
	auth: authReducer,
	alertMessage: alertMessageReducer
})

export default persistReducer(persistConfig, rootReducer)
