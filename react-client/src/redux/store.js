import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router'
import { history } from './rootReducer.js';

import rootReducer from './rootReducer.js';

const middlewares = [thunk, routerMiddleware(history)];

const composeEnhancers =
	process.env.NODE_ENV === 'development'
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null || compose;

const browserHistory = history;

export { browserHistory };

export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

export default { persistor, store };
