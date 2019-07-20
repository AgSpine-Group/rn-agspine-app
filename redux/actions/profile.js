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

const getAndPersistProfile = () => async dispatch => {
  // Fetch profile from Hub
  // Test profile with locations for now
  const profile = createTestProfile();

  // eslint-disable-next-line
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      const updatedProfile = Object.assign({}, profile, {
        name: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        uid: user.uid,
      });
      dispatch(profileCreatedSuccessfully(updatedProfile));
    } else {
      dispatch(profileCreateFailure('No logged in user'));
    }
  });
};

export { getAndPersistProfile };
