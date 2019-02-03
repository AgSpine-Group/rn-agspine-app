import items from './items';
import formData from './form';
import connection from './connection';
// import { reducer as offlineReducer } from 'redux-offline-queue';
import { combineReducers } from 'redux';

export default combineReducers({ formData, items, connection });