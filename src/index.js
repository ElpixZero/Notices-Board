import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import store from './store';

import './index.scss';

const render = Component => {
  ReactDOM.render(
  <Provider store={store}>
    <Component />
  </Provider>,
  document.getElementById('root')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  })
}

