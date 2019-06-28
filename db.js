import * as firebase from 'firebase';
import { dbConfig } from './env';


const DB = (config) => () => {
  return firebase.initializeApp(config)
}

export default DB(dbConfig);