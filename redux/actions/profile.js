import firebase from 'firebase';
import createTestProfile from '../../Profile';

export const PROFILE_CREATE_SUCCESS = 'PROFILE_CREATE_SUCCESS';
export const PROFILE_CREATE_FAILURE = 'PROFILE_CREATE_FAILURE';

const profileCreatedSuccessfully = profile => ({
  type: 'PROFILE_CREATE_SUCCESS',
  payload: profile,
});

const profileCreateFailure = error => ({
  type: 'PROFILE_CREATE_FAILURE',
  error,
});

export const getAndPersistProfileAsync = () => async dispatch => {
  // eslint-disable-next-line
  firebase.auth().onAuthStateChanged(async user => {
    try {
      await firebase
        .firestore()
        .collection('profiles')
        .doc(user.uid)
        .get()
        .then(async snapshot => {
          if (user && !snapshot.exists) {
            // Fetch profile from Hub
            // Test profile with locations for now
            // Saves to firebase and fetches on signin
            const { profile, areas, locations } = createTestProfile();
            const userProfile = Object.assign({}, profile, {
              name: user.displayName,
              email: user.email,
              emailVerified: user.emailVerified,
              uid: user.uid,
            });

            const batch = firebase.firestore().batch();

            const profileRef = firebase
              .firestore()
              .collection('profiles')
              .doc(user.uid);

            const locationRefs = locations.map(x => {
              return {
                ref: firebase
                  .firestore()
                  .collection('locations')
                  .doc(x.id),
                id: x.id,
                data: x,
              };
            });

            const areaRefs = areas.map(x => ({
              ref: firebase
                .firestore()
                .collection('areas')
                .doc(x.id),
              id: x.id,
              data: x,
            }));

            // Set profile
            batch.set(profileRef, profile);

            // Set locations for profile
            locationRefs.forEach(pr => batch.set(pr.ref, pr.data));

            // Set areas on locations
            areaRefs.forEach(lr => batch.set(lr.ref, lr.data));

            await batch.commit();

            dispatch(profileCreatedSuccessfully(userProfile));
          } else {
            dispatch(profileCreatedSuccessfully(snapshot.data()));
          }
        });
    } catch (ex) {
      dispatch(profileCreateFailure(ex));
      throw ex;
    }
  });
};

const initialState = {};

export const profileReducer = (state = initialState, action) => {
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
