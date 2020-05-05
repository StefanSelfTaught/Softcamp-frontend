import React from 'react';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter as Router } from 'connected-react-router';

import {
  store,
  persistor,
  browserHistory as history,
} from 'redux/store';
import App from 'App';
import 'index.css';

import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');

const renderApp = () => {
  render(
    <Provider store={store}>
      <PersistGate loading="Loading" persistor={persistor}>
        <Router history={history}>
          {/* <React.StrictMode> */}
          <App />
          {/* </React.StrictMode> */}
        </Router>
      </PersistGate>
    </Provider>,
    rootElement,
  );
};

if (rootElement.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <PersistGate loading="Loading" persistor={persistor}>
        <Router history={history}>
          {/* <React.StrictMode> */}
          <App />
          {/* </React.StrictMode> */}
        </Router>
      </PersistGate>
    </Provider>,
    rootElement,
  );
} else {
  renderApp();
}

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', renderApp);
}

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
