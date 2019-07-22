import { combineReducers } from 'redux';
import formData from './form_submit';
import { connectionReducer } from '../actions/connection';
import { profileReducer } from '../actions/profile';
import { submittedFormReducer } from '../actions/submitted_forms';
import { locationsReducer } from '../actions/locations';
import { areaReducer, areaFormReducer } from '../actions/area';

export default combineReducers({
  formData,
  connection: connectionReducer,
  submittedFormData: submittedFormReducer,
  profile: profileReducer,
  locations: locationsReducer,
  area: areaReducer,
  areaForms: areaFormReducer,
});
