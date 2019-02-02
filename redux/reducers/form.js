import C from '../constants';
import initialState from '../initial_state';

// `formData|${recordTypeId}|${recordId}`

const [formId, formRecordId] = (key) => key.split('|');

export default (state = initialState.formData, action) => {
  switch (action.type) {
    case 'SUBMIT_FORM_DATA_REQUEST': {
      return { state, ...{ loading: true } }
    }

    case 'SUBMIT_FORM_DATA_FAILURE': {
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
    case 'SUBMIT_FORM_DATA_SUCCESS': {
      const { data, key } = action;
      const { formId, formRecordId } = getPathFromKey(key);

      console.log(data, key);
      console.log('KEY AND DATA HERE');
      return {
        state: {
          data: [...state.data, { ...data, formId, formRecordId }]
        }
      }
    }

    default:
      return state;
  }
};
