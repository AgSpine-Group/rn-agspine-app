import firebase from 'firebase';

const FETCH_SUBMITTED_FORMS_SUCCESS = 'FETCH_SUBMITTED_FORMS_SUCCESS';
const FETCH_SUBMITTED_FORMS_REQUEST = 'FETCH_SUBMITTED_FORMS_REQUEST';
const FETCH_SUBMITTED_FORMS_ERROR = 'FETCH_SUBMITTED_FORMS_ERROR';

const fetchSubmittedFormsRequest = () => ({
  type: FETCH_SUBMITTED_FORMS_REQUEST,
});

const fetchSubmittedFormsSuccess = data => ({
  type: FETCH_SUBMITTED_FORMS_SUCCESS,
  data,
});
const fetchSubmittedFormsError = error => ({
  type: FETCH_SUBMITTED_FORMS_ERROR,
  error,
});

export const fetchSubmittedFormsAsync = () => async (dispatch, getState) => {
  const store = getState();
  fetchSubmittedFormsRequest();
  const { organisationId } = store.profile;

  console.log(organisationId);
  try {
    const doc = firebase
      .firestore()
      .collection('submittedForms')
      .where('organisationId', '==', organisationId)
      .get();
    // .then(snapshot => {
    //   snapshot.forEach(x => {
    //     if (snapshot.empty) {
    //       console.log('No matching documents.');
    //       return;
    //     }

    //     const data = snapshot.forEach(doc => {
    //       console.log(doc.id, '=>', doc.data());
    //     });
    //   });
    // });

    console.log(doc);
    // const data = doc.map(x => x.data());

    // console.log(data);
    if (!doc.empty) {
      fetchSubmittedFormsSuccess(doc.data());
    }
    throw new Error('No current documents');
  } catch (ex) {
    dispatch(fetchSubmittedFormsError(ex));
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
        // Preserve data
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
