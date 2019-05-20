const functions = require('firebase-functions');
const express = require('express');
const app = express();
const toolController = require('./Controllers/toolController');
const userController = require('./Controllers/userController');

app.use('/tool', toolController);
app.use('/user', userController);


const api = functions.https.onRequest((req, res) => {
   if (!req.path) {
       req.url = `/${req.url}` 
   };
   return app(req, res);
});


module.exports ={
  api
};