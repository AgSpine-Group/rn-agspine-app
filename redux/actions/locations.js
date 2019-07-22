import firebase from 'firebase';

const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS';
const FETCH_LOCATIONS_REQUEST = 'FETCH_LOCATIONS_REQUEST';
const FETCH_LOCATIONS_ERROR = 'FETCH_LOCATIONS_ERROR';

const fetchLocationsRequest = () => ({
  type: FETCH_LOCATIONS_REQUEST,
});

const fetchLocationsSuccess = data => {
  return {
    type: FETCH_LOCATIONS_SUCCESS,
    data,
  };
};
const fetchLocationsError = error => ({
  type: FETCH_LOCATIONS_ERROR,
  error,
});

export const fetchLocationsAsync = () => async (dispatch, getState) => {
  const store = getState();
  fetchLocationsRequest();
  const { organisationId } = store.profile;
  try {
    let data = [];

    await firebase
      .firestore()
      .collection('locations')
      .where('organisationId', '==', organisationId)
      .get()
      .then(snapshot => {
        snapshot.forEach(snap => {
          data.push(snap.data());
        });
      });

    if (!data.length) {
      throw new Error('No current documents');
    }
    return dispatch(fetchLocationsSuccess(data));
  } catch (ex) {
    return dispatch(fetchLocationsError(ex));
  }
};

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const locationsReducer = (state = initialState, action) => {
  const { data = [], error = {} } = action;
  switch (action.type) {
    case FETCH_LOCATIONS_SUCCESS: {
      return {
        loading: false,
        error: null,
        data,
      };
    }

    case FETCH_LOCATIONS_ERROR: {
      return {
        loading: false,
        error,
        // Preserve data if there is an error
        data: state.data,
      };
    }

    case FETCH_LOCATIONS_REQUEST: {
      return {
        loading: true,
        ...state,
      };
    }

    default: {
      return state;
    }
  }
};
