// import firebase from 'firebase';
const firebase = require("firebase");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoBebgi0tvoGb2sPRP4C0y97n3Kgk5fNc",
  authDomain: "toolshed-1dd98.firebaseapp.com",
  databaseURL: "https://toolshed-1dd98.firebaseio.com",
  projectId: "toolshed-1dd98",
  storageBucket: "toolshed-1dd98.appspot.com",
  messagingSenderId: "383756385801",
  appId: "1:383756385801:web:1e3ab018cb3d4bee"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;