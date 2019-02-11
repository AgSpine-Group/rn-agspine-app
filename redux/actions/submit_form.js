import axios from 'axios';
import uuid from 'uuid-v4';
import { LOCAL_STORAGE_PATHS } from '../constants'

const submitFormDataSuccess = ({ data, key }) => {
  console.log(data, key);
  console.log('DATA', 'KEY');
  return {
    type: 'SUBMIT_FORM_SUCCESS',
    data,
    key
  }
}

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

  console.log(payload);

  try {
    dispatch(submitFormDataRequest({ data: payload, formId, key: localStorageKey }));

    // await axios.post('http://localhost:8000/test', {
    //   data,
    //   syncKey: uniqueKey,
    //   formId,
    // })

    console.log('>>>>>>>>>>>>>>>>');
    // dispatch(submitFormDataSuccess({ data: payload, key: localStorageKey }));
  } catch (ex) {
    console.log(ex);
    console.log('EX THROWN FROM ACTION');
    dispatch(submitFormDataFailure(ex));
  }
}


export {
  submitFormDataAsync,
}
