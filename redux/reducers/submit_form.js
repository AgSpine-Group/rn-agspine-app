import C from '../constants';
import initialState from '../initial_state';
import _ from 'lodash';

const getData = (key) => key.split('|');

export default (state = initialState.formData, action) => {

  switch (action.type) {
    case 'SUBMIT_FORM_REQUEST': {
      const newData =
        [
          ...state.data,
          {
            id: action.payload.syncId,
            payload: action.payload,
            isTemp: true
          }
        ];

      return { ...state, data: newData, loading: true }
    }

    case 'SUBMIT_FORM_SUCCESS': {
      const updatedData = state.data.map(submittedForm => {
        if (submittedForm.id === action.meta.syncId) {
          return {
            ...submittedForm,
            id: action.payload.id || syncId,
            isTemp: false
          }
        }
        return submittedForm;
      })
      return { ...state, data: updatedData, loading: false }
    }

    case 'SUBMIT_FORM_FAILURE': {
      const { error } = action;
      const newData = state.data.filter(item => item.id === action.payload.syncId);

      return {
        ...state,
        ...{
          loading: false,
          hasError: true,
          error: error,
          data: newData
        }
      }
    }

    case 'Offline/JS_ERROR': {
      console.log(action.error);
    }

    default:
      return state;
  }
};


// const { data, key } = action.meta;
// const [formId, formRecordId] = getData(key);
// const prevState = state.state.data;
// const dataObject = _.set(prevState, `${formId}.${formRecordId}`, data);
// const newState = Object.assign({}, state.state.data, dataObject);
// const finalDataShape = Object.assign({}, state, {
//   loading: false,
//   data: newState,
// });
// return _.omit(finalDataShape, 'state');