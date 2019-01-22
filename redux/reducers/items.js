import C from '../constants';
import initialState from '../initial_state';


export default (state = initialState.login, action) => {
  const { data, error } = action;
  switch (action.type) {
    case 'FETCH_ITEMS_REQUEST': {
      return { state, ...{ loading: true } }
    }

    case 'FETCH_ITEMS_ERROR': {
      return { state, ...{ loading: false, hasError: true, error: action.payload } }
    }
    case 'FETCH_ITEMS_SUCCESS': {
      return { state, ...{ data, loading: false } }
    }

    default:
      return state;
  }
};
