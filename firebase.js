import * as firebase from 'firebase';
import 'firebase/firestore';
import * as env from './env';

const fb = config => () => {
  return firebase.initializeApp(config);
};

console.disableYellowBox = true;
console.reportErrorsAsExceptions = false;

export default fb(env.dbConfig);
