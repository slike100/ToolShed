"use strict";

let getAllToolRentalRecords = (() => {
  var _ref2 = _asyncToGenerator(function* () {
    console.log('in the getall tools helper function');
    const records = yield db.collection('RentalRecords').get();
    console.log(records, 'these are the records');
    return records;
  });

  return function getAllToolRentalRecords() {
    return _ref2.apply(this, arguments);
  };
})();

let sendEmailToUser = (() => {
  var _ref3 = _asyncToGenerator(function* (arr) {
    console.log('here is the array being passed', arr);
    var today = firebase.firestore.Timestamp.now().toMillis();
    for (let i = 0; i < arr.length; i++) {
      var startDate = arr[i].rentalStartTime.toMillis();
      var dueDate = arr[i].dueDate.toMillis();
      console.log(startDate, 'startDate');
      console.log(dueDate, 'due date');
      console.log(today, 'this is today date');
      if (today > dueDate) {
        var timeOver = today - dueDate;
        console.log(timeOver, 'timeOver');
        var days = timeOver / (1000 * 60 * 60 * 24);
        console.log(days, 'days');
        console.log("STARTING NEW PART");
        yield db.collection('User').doc(arr[i].ownerId).get().then(function (userDoc) {
          if (!userDoc.exists) {
            console.log('DB: No such document!');
          } else {
            console.log(userDoc.data(), 'userData');
            console.log(`Your tool has not been checked in yet. It is currently overdue by ${days}days!!`);
            var ownerMessage = `Your tool has not been checked in yet. It is currently overdue by ${days}days!!`;
            sendEmail(userDoc.data(), ownerMessage);
            return;
          }
        }).catch(function (err) {
          console.log('DB: Error getting document', err);
        });

        console.log(arr[i].rentalUserId, 'rentalUserId');

        yield db.collection('User').doc(arr[i].rentalUserId).get().then(function (userDoc) {
          if (!userDoc.exists) {
            console.log('Rental User: no such doc exists');
          } else {
            console.log(userDoc.data(), 'userData - in rental user');
            console.log(`The tool you are renting is currently overdue by ${days}days!!`);
            var renterMessage = `Your tool has not been checked in yet. It is currently overdue by ${days}days!!`;
            sendEmail(userDoc.data(), renterMessage);
            return;
          }
        }).catch(function (err) {
          console.log('DB: Error getting document - in rental user', err);
        });
      }
    }
  });

  return function sendEmailToUser(_x2) {
    return _ref3.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const functions = require("firebase-functions");
const firebase = require("firebase");
const toolController = require("./controllers/toolController");
const userController = require("./controllers/userController");
const toolRentalRecordController = require("./controllers/toolRentalRecordController");
const { db } = require('./app');
const sendEmail = require('./nodeMailer/nodeMailer');

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
    console.log(sendEmail, 'sendemail fucntion');
    console.log('inside the cron job function');
    const allRecordsSnapshot = yield getAllToolRentalRecords();
    var matchingRecords = [];
    const allRecords = yield allRecordsSnapshot.forEach(function (doc) {
      console.log(doc.id, '=> in second if', doc.data());
      var data = doc.data();
      console.log(data, 'first data');
      console.log(doc.id, 'doc.id');
      data.recordId = doc.id;
      console.log(data, 'second data');
      matchingRecords.push(data);
    });
    console.log(matchingRecords, 'matching records');
    const email = yield sendEmailToUser(matchingRecords);
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());