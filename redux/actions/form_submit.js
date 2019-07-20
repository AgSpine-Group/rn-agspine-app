import axios from 'axios';
import uuid from 'uuid-v4';
import { LOCAL_STORAGE_PATHS } from '../constants';
import firebase from '../../firebase';

// Reference for inspiration
// https://jslancer.com/blog/2017/05/23/no-internet-no-problem/
// Key difference is maintaining the syncId as a fallBack for the backend.

export const FORM_SUBMIT_REQUEST = 'FORM_SUBMIT_REQUEST';
export const FORM_SUBMIT_SUCCESS = 'FORM_SUBMIT_SUCCESS';
export const FORM_SUBMIT_FAILURE = 'FORM_SUBMIT_FAILURE';

const submitForm = ({ data, syncId, formId }) => {
  return {
    type: FORM_SUBMIT_REQUEST,
    loading: true,
    payload: {
      syncId,
      data,
    },
    meta: {
      offline: {
        // the network action to execute:
        effect: {
          url: `http://localhost:8000/form-submit`,
          method: 'POST',
          json: { data, formId },
        },
        // action to dispatch when effect succeeds:
        commit: {
          type: FORM_SUBMIT_SUCCESS,
          meta: { data, syncId },
        },
        // action to dispatch if network action fails permanently:
        rollback: {
          type: FORM_SUBMIT_FAILURE,
          meta: { data, syncId },
        },
      },
    },
  };
};

const submitFormDataFailure = error => ({
  type: 'FORM_SUBMIT_FAILURE',
  loading: true,
  error,
});

const submitFormDataAsync = (data, formId) => async dispatch => {
  const syncId = uuid();
  const dataWithKey = { ...data, syncId, formId };
  try {
    dispatch(submitForm({ data: dataWithKey, syncId, formId }));
  } catch (ex) {
    dispatch(submitFormDataFailure(ex));
  }
};

export { submitFormDataAsync };
