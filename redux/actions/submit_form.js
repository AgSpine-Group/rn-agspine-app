import axios from 'axios';
import uuid from 'uuid-v4';
import { LOCAL_STORAGE_PATHS } from '../constants'

const submitFormDataRequest = ({ data, formId, key }) => {
  return {
    type: 'SUBMIT_FORM_REQUEST',
    loading: true,
    meta: {
      offline: {
        // the network action to execute:
        effect: {
          url: `http://localhost:8000/test`, method: 'POST', json: { data }
        },
        // action to dispatch when effect succeeds:
        commit: {
          type: 'SUBMIT_FORM_SUCCESS', meta: { key, data }
        },
        // action to dispatch if network action fails permanently:
        rollback: {
          type: 'SUBMIT_FORM_FAILURE', meta: { key, data }
        }
      }
    }
  }
}

const submitFormDataFailure = (error) => ({
  type: 'SUBMIT_FORM_FAILURE',
  loading: true,
  error,
})

const submitFormDataAsync = (data, formId) => async (dispatch) => {
  const uniqueKey = uuid()
  const localStorageKey = LOCAL_STORAGE_PATHS['formData'](formId, uniqueKey);

  const payload = { ...data, syncId: uniqueKey };
  try {
    dispatch(submitFormDataRequest({ data: payload, formId, key: localStorageKey }));
  } catch (ex) {
    dispatch(submitFormDataFailure(ex));
  }
}


export {
  submitFormDataAsync,
}
