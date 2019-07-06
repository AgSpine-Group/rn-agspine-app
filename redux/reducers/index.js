import { combineReducers } from 'redux';
import formData from './form_submit';
import connection from './connection';

export default combineReducers({ formData, connection });
