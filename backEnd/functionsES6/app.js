const admin = require('firebase-admin');
const functions = require('firebase-functions');


admin.initializeApp(functions.config().firebase);

const firebaseConfig = {
  apiKey: "AIzaSyBoBebgi0tvoGb2sPRP4C0y97n3Kgk5fNc",
  authDomain: "toolshed-1dd98.firebaseapp.com",
  databaseURL: "https://toolshed-1dd98.firebaseio.com",
  projectId: "toolshed-1dd98",
  storageBucket: "toolshed-1dd98.appspot.com",
  messagingSenderId: "383756385801",
  appId: "1:383756385801:web:4904bffe4c9fdc0f"
};

export var db = admin.firestore(firebaseConfig);
