const functions = require("firebase-functions");
const toolController = require("./controllers/toolController");
const userController = require("./controllers/userController");
const toolRentalRecordController = require("./controllers/toolRentalRecordController");

exports.tool = functions.https.onRequest((req, res) => {
  return toolController(req, res);
});

exports.user = functions.https.onRequest((req, res) => {
  return userController(req, res);
});

exports.toolRentalRecord = functions.https.onRequest((req, res) => {
  return toolRentalRecordController(req, res);
});

// exports.scheduledFunctionCrontab =
// functions.pubsub.schedule('* * * * *').onRun((context) => {
//     console.log('This will every minute');
// });