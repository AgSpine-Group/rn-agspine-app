import { createStore, applyMiddleware, combineReducers } from 'redux';
import rootReducer from '../reducers/index';
import logger from 'redux-logger';

import promiseMiddleware from 'redux-promise-middleware';

import thunk from 'redux-thunk';

const promise = promiseMiddleware();

const storeWithMiddleware = compose(applyMiddleware(
  thunk,
  promise,
  logger,
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore));

export default storeWithMiddleware(combineReducers(rootReducer), {});
