const functions = require("firebase-functions");
const toolController = require("./controllers/toolController");
const userController = require("./controllers/userController");
const stripeController = require("./controllers/stripeController")

exports.tool = functions.https.onRequest((req, res) => {
  return toolController(req, res);
});

exports.user = functions.https.onRequest((req, res) => {
  return userController(req, res);
});

exports.stripeController = functions.https.onRequest((req, res) => {
  return userController(req, res);
});