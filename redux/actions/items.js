import uuid from 'uuid-v4';
import { LOCAL_STORAGE_PATHS } from '../constants'
// const fetchItemsError = (error) => {
//   return {
//     type: 'FETCH_ITEMS_ERROR',
//     error
//   };
// }
// const fetchItemsSuccess = (data) => {
//   return {
//     type: 'FETCH_ITEMS_SUCCESS',
//     data
//   };
// }

// const fetchItemsRequest = () => {
//   return {
//     type: 'FETCH_ITEMS_REQUEST',
//   };
// }

// const fetchItemsAsync = (data) => async (dispatch) => {
//   dispatch(fetchItemsRequest());
//   return dispatch(fetchItemsSuccess(data));
// }

const submitFormDataSuccess = (data, key) => ({
  type: 'SUBMIT_FORM_DATA_SUCCESS',
  data,
  key
})

const submitFormDataRequest = () => ({
  type: 'SUBMIT_FORM_DATA_REQUEST',
  loading: true
})

const submitFormDataFailure = (error) => ({
  type: 'SUBMIT_FORM_DATA_FAILURE',
  loading: true,
  error,
})

const submitFormDataAsync = (data, formId) => async (dispatch) => {
  const key = uuid()
  const localStorageKey = LOCAL_STORAGE_PATHS['formData'](formId, key);

  try {
    dispatch(submitFormDataRequest());
    dispatch(submitFormDataSuccess(data, localStorageKey));
  } catch (ex) {
    dispatch(submitFormDataFailure(ex));
  }
}


export {
  submitFormDataAsync,
}
