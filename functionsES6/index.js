const functions = require('firebase-functions');
const toolController = require('./controllers/toolController') 

exports.tool = functions.https.onRequest((req, res) => {
  return toolController(req,res)
});
