import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCSCuRP123Ykq5jn2oEFdhWnX689u0-3R4",
  authDomain: "todo-89b1b.firebaseapp.com",
  databaseURL: "https://todo-89b1b.firebaseio.com",
  projectId: "todo-89b1b",
  storageBucket: "todo-89b1b.appspot.com",
  messagingSenderId: "1083130872338",
  appId: "1:1083130872338:web:ea9820f3a772ed497dcecb",
  measurementId: "G-H4YQZ25E3N"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firestore = firebaseApp.firestore();

export default firestore
