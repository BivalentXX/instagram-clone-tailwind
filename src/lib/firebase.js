import Firebase from 'firebase/app';
import firebase from 'firebase';
import 'firebase/storage'
import 'firebase/firestore';
import 'firebase/auth';
// import { config } from '../config.js'
//import { seedDatabase } from '../seed';


const { REACT_APP_apiKey, REACT_APP_authDomain, REACT_APP_projectId, REACT_APP_storageBucket, REACT_APP_messagingSenderId, REACT_APP_appId} = process.env

const configKeys = {
  apiKey: REACT_APP_apiKey,
  authDomain: REACT_APP_authDomain,
  projectId: REACT_APP_projectId,
  storageBucket: REACT_APP_storageBucket,
  messagingSenderId: REACT_APP_messagingSenderId,
  appId: REACT_APP_appId
}

const firebaseApp = Firebase.initializeApp(configKeys);
const storage = firebase.storage();
const { FieldValue } = Firebase.firestore;

const db = firebaseApp.firestore();



//console.log('firebase', firebase);
//seedDatabase(firebase)

export { db, storage, firebaseApp, FieldValue };