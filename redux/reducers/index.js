import { combineReducers } from 'redux';
import formData from './form_submit';
import { connectionReducer } from '../actions/connection';
import { profileReducer } from '../actions/profile';
import { submittedFormReducer } from '../actions/submitted_forms';

export default combineReducers({
  formData,
  connection: connectionReducer,
  submittedFormData: submittedFormReducer,
  profile: profileReducer,
});
