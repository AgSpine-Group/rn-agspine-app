import uuid from 'uuid-v4';
import { LOCAL_STORAGE_PATHS } from '../constants'

const submitFormDataSuccess = ({ data, key }) => ({
  type: 'SUBMIT_FORM_SUCCESS',
  data,
  key
})

const submitFormDataRequest = ({ data, formId, key }) => ({
  type: 'SUBMIT_FORM_REQUEST',
  loading: true,
  meta: {
    offline: {
      // the network action to execute:
      effect: {
        url: `/v1/form/${formId}/new`, method: 'POST', json: { data }
      },
      // action to dispatch when effect succeeds:
      commit: {
        type: 'SUBMIT_FORM_COMMIT', meta: { key, data }
      },
      // action to dispatch if network action fails permanently:
      rollback: {
        type: 'SUBMIT_FORM_ROLLBACK', meta: { key, data }
      }
    }
  }
})

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
    dispatch(submitFormDataSuccess({ data: payload, localStorageKey }));
  } catch (ex) {
    console.log(ex);
    console.log('EX THROWN FROM ACTION');
    dispatch(submitFormDataFailure(ex));
  }
}


export {
  submitFormDataAsync,
}
