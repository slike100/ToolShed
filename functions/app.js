'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const functions = require('firebase-functions');
const firebase = require('firebase');
// const admin = require('firebase-admin');

var config = {
  apiKey: 'AIzaSyBoBebgi0tvoGb2sPRP4C0y97n3Kgk5fNc',
  projectId: 'toolshed-1dd98',
  storageBucket: 'gs://toolshed-1dd98.com'
};

firebase.initializeApp(config);

var db = exports.db = firebase.firestore();