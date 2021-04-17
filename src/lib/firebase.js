import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//import { seedDatabase } from '../seed';


const config = {
    apiKey: "AIzaSyA-Vvt2NotJqN3TMqP1kdDwkICLIfPbnBU",
    authDomain: "instagram-clone-tailwind.firebaseapp.com",
    projectId: "instagram-clone-tailwind",
    storageBucket: "instagram-clone-tailwind.appspot.com",
    messagingSenderId: "24478479259",
    appId: "1:24478479259:web:4a0b53b04d97fc3e18273e"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

//console.log('firebase', firebase);
//seedDatabase(firebase)

export { firebase, FieldValue };