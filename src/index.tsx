import ReactDOM from 'react-dom/client';
import React from 'react';

import App from './App';

import { store } from './redux/slices/store';
import { Provider } from 'react-redux';
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);


