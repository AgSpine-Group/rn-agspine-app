import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from '../reducers/index';

const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
};

const {
  middleware: offlineMiddleware,
  enhanceReducer: offlineEnhanceReducer,
  enhanceStore: offlineEnhanceStore,
} = createOffline({
  ...offlineConfig,
  persist: false,
});

const promise = promiseMiddleware();

const persistedReducer = persistReducer(persistConfig, offlineEnhanceReducer(rootReducer));

const middleware = compose(
  applyMiddleware(thunk, promise, logger, offlineMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  offlineEnhanceStore
);

export default () => {
  const store = createStore(persistedReducer, {}, middleware);
  const persistor = persistStore(store);

  return { store, persistor };
};
