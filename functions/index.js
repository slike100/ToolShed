"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const functions = require("firebase-functions");
const toolController = require("./controllers/toolController");
const userController = require("./controllers/userController");
const toolRentalRecordController = require("./controllers/toolRentalRecordController");
const { db } = require('./app');

exports.tool = functions.https.onRequest((req, res) => {
  return toolController(req, res);
});

exports.user = functions.https.onRequest((req, res) => {
  return userController(req, res);
});

exports.toolRentalRecord = functions.https.onRequest((req, res) => {
  return toolRentalRecordController(req, res);
});

exports.getAllToolRentalRecords = functions.pubsub.schedule('* * * * *').onRun((() => {
  var _ref = _asyncToGenerator(function* (context) {
    console.log('inside the cron job function');
    const allRecords = yield getAllToolRentalRecords();
    yield console.log(allRecords, "all records in the actual scheduled func");
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());

function getAllToolRentalRecords() {
  console.log('in the getall tools helper function');
  db.collection('RentalRecords').get().then(snapshot => {
    console.log('snapshot', snapshot);
    if (snapshot.empty) {
      console.log('no records exist');
      return;
    } else var matchingRecords = [];
    snapshot.forEach(doc => {
      console.log(doc.id, '=> in second if', doc.data());
      matchingRecords.push(doc.data());
      console.log('matching records', matchingRecords);
      return matchingRecords;
    });
  }).catch(err => {
    console.log('error getting documents', err);
  });
}