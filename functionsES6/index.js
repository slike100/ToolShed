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

exports.getAllToolRentalRecords =
functions.pubsub.schedule('* * * * *').onRun(async context => {
    console.log('inside the cron job function')
    const allRecords = await getAllToolRentalRecords();
    await console.log(allRecords, "all records in the actual scheduled func");
});

function getAllToolRentalRecords(){
  console.log('in the getall tools helper function')
  db.collection('RentalRecords').get()
  .then(snapshot => {
    console.log('snapshot', snapshot);
    if(snapshot.empty){
      console.log('no records exist')
      return;
    } else
      var matchingRecords = [];
      snapshot.forEach(doc => {
      console.log(doc.id, '=> in second if', doc.data());
      matchingRecords.push(doc.data());
      console.log('matching records', matchingRecords)
      return matchingRecords;
    })
  })
  .catch(err => {
    console.log('error getting documents', err);
  })
}
