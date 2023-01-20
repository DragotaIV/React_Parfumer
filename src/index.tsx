import ReactDOM from 'react-dom/client';
import React from 'react';

import App from './App';

import { store } from './redux/slices/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

