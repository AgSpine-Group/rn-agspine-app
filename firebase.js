import * as firebase from 'firebase';
import 'firebase/firestore';
import * as env from './env';

const fb = config => () => {
  console.disableYellowBox = true
  console.reportErrorsAsExceptions = false;
  return firebase.initializeApp(config);
};

export default fb(env.dbConfig);
