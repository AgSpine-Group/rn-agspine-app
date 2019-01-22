import C from '../constants';
import initialState from '../initial_state';

export default (state = fromJS(initialState.mostOrdered), action) => {
  const { data, error } = action;
  switch (action.type) {
    default:
      return state;
  }
};
