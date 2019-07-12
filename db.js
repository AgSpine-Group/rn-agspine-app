import * as firebase from 'firebase';

const dbConfig = {
  apiKey: 'AIzaSyDOj4HOjme4t0FcS_tH6Pts7QLA3YT34-Y',
  authDomain: 'agspine-2847c.firebaseapp.com',
  databaseURL: 'https://agspine-2847c.firebaseio.com',
  projectId: 'agspine-2847c',
  storageBucket: 'agspine-2847c.appspot.com',
  messagingSenderId: '492799843537',
  appId: '1:492799843537:web:7e112c2fd9973c4e',
};

const DB = config => () => {
  return firebase.initializeApp(config);
};

export default DB(dbConfig);
