const initialState = {};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PROFILE_CREATE_SUCCESS':
      return Object.assign({}, state, action.payload);

    case 'PROFILE_CREATE_FAILURE':
      return Object.assign(state, { error: action.error });
    default:
      return state;
  }
};

export default profileReducer;
