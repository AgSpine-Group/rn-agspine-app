import firebase from 'firebase';

const FETCH_AREA_SUCCESS = 'FETCH_AREA_SUCCESS';
const FETCH_AREA_REQUEST = 'FETCH_AREA_REQUEST';
const FETCH_AREA_ERROR = 'FETCH_AREA_ERROR';

const fetchAreaRequest = () => ({
  type: FETCH_AREA_REQUEST,
});

const fetchAreaSuccess = data => {
  return {
    type: FETCH_AREA_SUCCESS,
    data,
  };
};
const fetchAreaError = error => ({
  type: FETCH_AREA_ERROR,
  error,
});

export const fetchAreaAsync = id => async dispatch => {
  dispatch(fetchAreaRequest());
  try {
    await firebase
      .firestore()
      .collection('areas')
      .where('id', '==', id)
      .get()
      .then(snapshot => {
        snapshot.forEach(snap => {
          dispatch(fetchAreaSuccess(snap.data()));
        });
      });
    throw new Error('No current documents');
  } catch (ex) {
    return dispatch(fetchAreaError(ex));
  }
};

const initialState = {
  data: {},
  error: null,
  loading: false,
};

export const areaReducer = (state = initialState, action) => {
  const { data = {}, error = {} } = action;
  switch (action.type) {
    case FETCH_AREA_SUCCESS: {
      return {
        loading: false,
        error: null,
        data,
      };
    }

    case FETCH_AREA_ERROR: {
      return {
        loading: false,
        error,
        // Preserve data if there is an error
        data: state.data,
      };
    }

    case FETCH_AREA_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    default: {
      return state;
    }
  }
};

const FETCH_AREA_FORMS_SUCCESS = 'FETCH_AREA_FORMS_SUCCESS';
const FETCH_AREA_FORMS_REQUEST = 'FETCH_AREA_FORMS_REQUEST';
const CLEAR_AREA_FORMS = 'CLEAR_AREA_FORMS';
const FETCH_AREA_FORMS_ERROR = 'FETCH_AREA_FORMS_ERROR';

const fetchAreaFormsRequest = () => ({
  type: FETCH_AREA_FORMS_REQUEST,
});

const fetchAreaFormsSuccess = data => {
  return {
    type: FETCH_AREA_FORMS_SUCCESS,
    data,
  };
};
const fetchAreaFormsError = error => ({
  type: FETCH_AREA_FORMS_ERROR,
  error,
});

const clearAreaForms = () => ({
  type: CLEAR_AREA_FORMS,
});

export const clearAreaFormsAsync = () => async dispatch => dispatch(clearAreaForms());

export const fetchAreaFormsAsync = id => async dispatch => {
  dispatch(fetchAreaFormsRequest());

  try {
    let data = [];

    await firebase
      .firestore()
      .collection('submittedForms')
      .where('area.identification.id', '==', id)
      .get()
      .then(snapshot => {
        snapshot.forEach(snap => {
          data.push(snap.data());
        });
      });

    if (!data.length) {
      throw new Error('No current documents');
    }
    return dispatch(fetchAreaFormsSuccess(data));
  } catch (ex) {
    return dispatch(fetchAreaFormsError(ex));
  }
};

const areaFormInitialState = {
  data: [],
  error: null,
  loading: true,
};

export const areaFormReducer = (state = areaFormInitialState, action) => {
  const { data = [], error = {} } = action;
  switch (action.type) {
    case FETCH_AREA_FORMS_SUCCESS: {
      return {
        loading: false,
        error: null,
        data,
      };
    }

    case FETCH_AREA_FORMS_ERROR: {
      return {
        loading: false,
        error,
        // Preserve data if there is an error
        data: state.data,
      };
    }

    case FETCH_AREA_FORMS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case CLEAR_AREA_FORMS: {
      return {
        ...areaFormInitialState,
      };
    }

    default: {
      return state;
    }
  }
};
