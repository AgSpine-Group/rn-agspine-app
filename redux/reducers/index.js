import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect, combineReducers } from 'react-redux';

import reducer from './someReducer';
import RepoList from './RepoList';

export default combineReducers({
  someReducer: reducer,
})