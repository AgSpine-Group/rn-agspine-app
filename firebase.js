import * as firebase from 'firebase';
import 'firebase/firestore';
import * as env from './env';

const fb = config => () => {
  return firebase.initializeApp(config);
};

export default fb(env.dbConfig);
