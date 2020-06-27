import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { githubUserReducer } from './store/reducer';

const store = createStore(githubUserReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

