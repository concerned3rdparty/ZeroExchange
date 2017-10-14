import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';

import RouteLoader from './RouteLoader';
import configureStore from './redux/store';

import serviceWorkerRegister from './registerServiceWorker';

// Service Worker for PWA
serviceWorkerRegister();

// Create redux store
const store = configureStore();

render(<Provider store={store}>
  <BrowserRouter>
    <RouteLoader />
  </BrowserRouter>
</Provider>, document.getElementById('root'));
