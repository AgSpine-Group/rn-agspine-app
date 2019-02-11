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
      const { data, key } = action.meta;
      const [formId, formRecordId] = getData(key);
      const prevState = state.state.data;
      const dataObject = _.set(prevState, `${formId}.${formRecordId}`, data);
      const newState = Object.assign({}, state.state.data, dataObject);
      const finalDataShape = Object.assign({}, state, {
        loading: false,
        data: newState,
      });
      return _.omit(finalDataShape, 'state');
    }

    case 'Offline/JS_ERROR': {
      console.log(action.error);
    }

    default:
      return state;
  }
};
