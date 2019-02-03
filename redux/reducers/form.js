import C from '../constants';
import initialState from '../initial_state';
import _ from 'lodash';

const getData = (key) => key.split('|');

export default (state = initialState.formData, action) => {
  switch (action.type) {
    case 'SUBMIT_FORM_REQUEST': {
      return { state, loading: true }
    }

    case 'SUBMIT_FORM_FAILURE': {
      const { error } = action;
      return {
        state,
        ...{
          loading: false,
          hasError: true,
          error: error
        }
      }
    }
    case 'SUBMIT_FORM_SUCCESS': {
      const { data, key } = action;
      const [formId, formRecordId] = getData(key);

      const newData = { ...state.data };
      const dataObject = _.set(newData, `${formId}.${formRecordId}`, data);

      return Object.assign({}, state, {
        loading: false,
        data: dataObject,
      })
    }

    default:
      return state;
  }
};
