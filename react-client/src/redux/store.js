import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import { cacheEnhancer } from 'redux-cache';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import rootReducer, { history } from './rootReducer';

const middlewares = [thunk, routerMiddleware(history)];

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : null || compose;

const browserHistory = history;

export { browserHistory };

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares), cacheEnhancer({ log: true })),
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
}

export const persistor = persistStore(store);

export default { persistor, store };
