import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './context/firebase';
import { firebaseApp, FieldValue } from './lib/firebase';
import './styles/app.css';


ReactDOM.render(
  <FirebaseContext.Provider value={{ firebaseApp, FieldValue }}>
    <App />
  </FirebaseContext.Provider>, 
  document.getElementById('root')
);

