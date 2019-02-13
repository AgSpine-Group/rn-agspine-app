import axios from 'axios';
import uuid from 'uuid-v4';
import { LOCAL_STORAGE_PATHS } from '../constants'

// Reference for inspiration
// https://jslancer.com/blog/2017/05/23/no-internet-no-problem/
// Key difference is maintaining the syncId as a fallBack for the backend.

const submitForm = ({ data, syncId }) => {
  return {
    type: 'SUBMIT_FORM_REQUEST',
    loading: true,
    payload: {
      syncId,
      data
    },
    meta: {
      offline: {
        // the network action to execute:
        effect: {
          url: `http://localhost:8000/test`,
          method: 'POST', json: { data }
        },
        // action to dispatch when effect succeeds:
        commit: {
          type: 'SUBMIT_FORM_SUCCESS',
          meta: { data, syncId }
        },
        // action to dispatch if network action fails permanently:
        rollback: {
          type: 'SUBMIT_FORM_FAILURE',
          meta: { data, syncId },
        }
      }
    }
  }
}

const submitFormDataFailure = (error) => ({
  type: 'SUBMIT_FORM_FAILURE',
  loading: true,
  error,
});

const submitFormDataAsync = (data, formId) => async (dispatch) => {
  const syncId = uuid()
  const dataWithKey = { ...data, syncId, formId };
  try {
    dispatch(submitForm({ data: dataWithKey, syncId }));
  } catch (ex) {
    dispatch(submitFormDataFailure(ex));
  }
}


export {
  submitFormDataAsync,
}
