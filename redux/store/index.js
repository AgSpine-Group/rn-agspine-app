import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';

import { persistStore, persistCombineReducers, persistReducer } from 'redux-persist'

const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
}

const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

const middleware = compose(applyMiddleware(
  thunk,
  logger,
), window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);

export default storeWithMiddleware(rootReducer, {});
