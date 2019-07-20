import firebase from 'firebase';

const FETCH_SUBMITTED_FORMS_SUCCESS = 'FETCH_SUBMITTED_FORMS_SUCCESS';
const FETCH_SUBMITTED_FORMS_REQUEST = 'FETCH_SUBMITTED_FORMS_REQUEST';
const FETCH_SUBMITTED_FORMS_ERROR = 'FETCH_SUBMITTED_FORMS_ERROR';

const fetchSubmittedFormsRequest = () => ({
  type: FETCH_SUBMITTED_FORMS_REQUEST,
});

const fetchSubmittedFormsSuccess = data => {
  return {
    type: FETCH_SUBMITTED_FORMS_SUCCESS,
    data,
  };
};
const fetchSubmittedFormsError = error => ({
  type: FETCH_SUBMITTED_FORMS_ERROR,
  error,
});

export const fetchSubmittedFormsAsync = () => async (dispatch, getState) => {
  const store = getState();
  fetchSubmittedFormsRequest();
  const { organisationId } = store.profile;
  try {
    let data = [];

    await firebase
      .firestore()
      .collection('submittedForms')
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
    return dispatch(fetchSubmittedFormsSuccess(data));
  } catch (ex) {
    return dispatch(fetchSubmittedFormsError(ex));
  }
};

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const submittedFormReducer = (state = initialState, action) => {
  const { data = [], error = {} } = action;
  switch (action.type) {
    case FETCH_SUBMITTED_FORMS_SUCCESS: {
      return {
        loading: false,
        error: null,
        data,
      };
    }

    case FETCH_SUBMITTED_FORMS_ERROR: {
      return {
        loading: false,
        error,
        // Preserve data if there is an error
        data: state.data,
      };
    }

    case FETCH_SUBMITTED_FORMS_REQUEST: {
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
