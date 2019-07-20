import { combineReducers } from 'redux';
import formData from './form_submit';
import connection from './connection';
import profile from './profile';
import { submittedFormReducer } from '../actions/submitted_forms';

export default combineReducers({
  formData,
  connection,
  submittedFormData: submittedFormReducer,
  profile,
});
