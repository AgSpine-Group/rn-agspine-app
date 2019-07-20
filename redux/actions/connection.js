export const connectionState = ({ status }) => {
  return { type: 'CHANGE_CONNECTION_STATUS', isConnected: status };
};

const initialState = {
  isConnected: false,
};

export const connectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_CONNECTION_STATUS':
      return Object.assign({}, state, {
        isConnected: action.isConnected,
      });
    default:
      return state;
  }
};
