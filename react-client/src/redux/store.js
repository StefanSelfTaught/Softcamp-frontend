import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer, { history } from 'redux/rootReducer';

const middlewares = [thunk, routerMiddleware(history)];

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? composeWithDevTools
  : null || compose;

const browserHistory = history;

export { browserHistory };

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
}

export const persistor = persistStore(store);

export default { persistor, store };
