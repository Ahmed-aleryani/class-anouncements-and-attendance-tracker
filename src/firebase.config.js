import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyB7KXAGrjpqvIyjhXsnq08Xwkr75wC0dwc",
    authDomain: "caat-2021.firebaseapp.com",
    projectId: "caat-2021",
    storageBucket: "caat-2021.appspot.com",
    messagingSenderId: "919802029405",
    appId: "1:919802029405:web:b8d345f8ce6d1ac835f4b4"
  };

// Initialize firebase

firebase.initializeApp(firebaseConfig);

export default firebase;
