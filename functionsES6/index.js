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

exports.getAllToolRentalRecords =
functions.pubsub.schedule('* * * * *').onRun(async context => {
    console.log(sendEmail, 'sendemail fucntion')
    console.log('inside the cron job function')
    const allRecordsSnapshot = await getAllToolRentalRecords();
    var matchingRecords = [];
    const allRecords = await allRecordsSnapshot.forEach(doc => {
      console.log(doc.id, '=> in second if', doc.data());
      var data = doc.data();
      console.log(data, 'first data')
      console.log(doc.id, 'doc.id')
      data.recordId = doc.id;
      console.log(data, 'second data');
      matchingRecords.push(data);
    });
    console.log(matchingRecords, 'matching records');
    const email = await sendEmailToUser(matchingRecords);
});

async function getAllToolRentalRecords(){
  console.log('in the getall tools helper function')
  const records = await db.collection('RentalRecords').get();
  console.log(records, 'these are the records');
  return records;
}

async function sendEmailToUser(arr){
  console.log('here is the array being passed', arr);
  var today = firebase.firestore.Timestamp.now().toMillis();
  for (let i = 0; i < arr.length; i++) {
    var startDate = arr[i].rentalStartTime.toMillis()
    var dueDate = arr[i].dueDate.toMillis();
    console.log(startDate, 'startDate');
    console.log(dueDate, 'due date');
    console.log(today, 'this is today date');
    if(today > dueDate){
      var timeOver = (today - dueDate);
      console.log(timeOver, 'timeOver');
      var days = timeOver/(1000*60*60*24)
      console.log(days, 'days');
      console.log("STARTING NEW PART")
      await db.collection('User').doc(arr[i].ownerId).get()
      .then(userDoc => {
        if (!userDoc.exists) {
          console.log('DB: No such document!');
        } else {
          console.log(userDoc.data(), 'userData');
          console.log(`Your tool has not been checked in yet. It is currently overdue by ${days}days!!`);
          var ownerMessage = `Your tool has not been checked in yet. It is currently overdue by ${days}days!!`
          sendEmail(userDoc.data(), ownerMessage)
          return;
        }
      })
      .catch(err => {
        console.log('DB: Error getting document', err);
      });

      console.log(arr[i].rentalUserId, 'rentalUserId');

      await db.collection('User').doc(arr[i].rentalUserId).get()
      .then( userDoc => {
        if (!userDoc.exists) {
          console.log('Rental User: no such doc exists');
        } else {
          console.log(userDoc.data(), 'userData - in rental user');
          console.log(`The tool you are renting is currently overdue by ${days}days!!`);
          var renterMessage = `Your tool has not been checked in yet. It is currently overdue by ${days}days!!`
          sendEmail(userDoc.data(), renterMessage)
          return;
        }
      })
      .catch(err => {
        console.log('DB: Error getting document - in rental user', err);
      });
    }
  }
}

