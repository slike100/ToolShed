const functions = require("firebase-functions");
const firebase = require("firebase");
const toolController = require("./controllers/toolController");
const userController = require("./controllers/userController");
const stripeController = require("./controllers/stripeController");
const toolRentalRecordController = require("./controllers/toolRentalRecordController");
const { db } = require("./app");
const sendEmail = require("./nodeMailer/nodeMailer");
import * as Storage from '@google-cloud/storage';



exports.tool = functions.https.onRequest((req, res) => {
  return toolController(req, res);
});

exports.user = functions.https.onRequest((req, res) => {
  return userController(req, res);
});

exports.stripe = functions.https.onRequest((req, res) => {
  return stripeController(req, res);
});

exports.toolRentalRecord = functions.https.onRequest((req, res) => {
  return toolRentalRecordController(req, res);
});

exports.getAllToolRentalRecords = functions.pubsub
  .schedule("0 0 * * * ")
  .onRun(async context => {
    console.log(sendEmail, "sendemail fucntion");
    console.log("inside the cron job function");
    const allRecordsSnapshot = await getAllToolRentalRecords();
    var matchingRecords = [];
    const allRecords = await allRecordsSnapshot.forEach(doc => {
      console.log(doc.id, "=> in second if", doc.data());
      var data = doc.data();
      console.log(data, "first data");
      console.log(doc.id, "doc.id");
      data.recordId = doc.id;
      console.log(data, "second data");
      matchingRecords.push(data);
    });
    console.log(matchingRecords, "matching records");
    const email = await sendEmailToUser(matchingRecords);
  });

async function getAllToolRentalRecords() {
  const records = await db.collection("RentalRecords").get();
  return records;
}

async function sendEmailToUser(arr) {
  console.log("here is the array being passed", arr);
  var today = firebase.firestore.Timestamp.now().toMillis();
  for (let i = 0; i < arr.length; i++) {
    var startDate = arr[i].rentalStartTime.toMillis();
    var dueDate = arr[i].dueDate.toMillis();
    console.log(
      Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24)),
      "math for second condition?"
    );
    console.log(startDate, "startDate");
    console.log(dueDate, "due date");
    console.log(today, "this is today date");
    if (today > dueDate) {
      var timeOver = today - dueDate;
      console.log(timeOver, "timeOver");
      var days = Math.ceil(timeOver / (1000 * 60 * 60 * 24));
      console.log(days, "days");
      console.log("STARTING NEW PART");
      await db
        .collection("User")
        .doc(arr[i].ownerId)
        .get()
        .then(userDoc => {
          let data = userDoc.data();
          let userName = data.userName;
          if (!userDoc.exists) {
            console.log("DB: No such document!");
          } else {
            console.log(userName);
            console.log(userDoc.data(), "userData");
            console.log(
              `Your tool has not been checked in yet. It is currently overdue by ${days} days!!`
            );
            if (days > 1) {
              var ownerMessage = `Hello ${userName},<br>
            <br>Our records indicate that the tool you lent out has not been returned to you yet. It is currently overdue by ${days} days. If the tool has been turned into you, please navigate to your user profile and click the 'returned' button for that tool. If you have not recieved your tool, and would like to report a dispute, please navigate to the about page and fill out the correct form.<br>
            <br>Thank you,<br>
              ToolShed Team`;
            } else {
              var ownerMessage = `Hello ${userName},<br>
            <br>Our records indicate that the tool you lent out has not been returned to you yet. It is currently overdue by ${days} day. If the tool has been turned into you, please navigate to your user profile and click the 'returned' button on the tool. If you have not recieved your tool, and would like to report a dispute, please navigate to the about page and fill out the correct form. <br>
            <br>Thank you,<br>
              ToolShed Team`;
            }
            // var ownerMessage = `Hello ${username}, Your tool has not been checked in yet. It is currently overdue by ${days} days!!`
            sendEmail(userDoc.data(), ownerMessage);
          }
        })
        .catch(err => {
          console.log("DB: Error getting document", err);
        });

      console.log(arr[i].rentalUserId, "rentalUserId");

      await db
        .collection("User")
        .doc(arr[i].rentalUserId)
        .get()
        .then(userDoc => {
          let data = userDoc.data();
          let userName = data.userName;
          if (!userDoc.exists) {
            console.log("Rental User: no such doc exists");
          } else {
            console.log(userDoc.data(), "userData - in rental user");
            console.log(
              `The tool you are renting is currently overdue by ${days}days!!`
            );
            if (days > 1) {
              var renterMessage = `Hello ${userName},<br>
             <br> Our records indicate that the tool you rented has not been returned to the owner yet. It is currently overdue by ${days} days. If you have already returned the tool, please contact the owner to settle the transaction. If you need further assitance please contact support. If you have not returned your tool, please return it as soon as possible. You will be charged late fees for each day past the rental due date. <br>
             <br> Thank you,<br>
               ToolShed Team`;
            } else {
              var renterMessage = `Hello ${userName},<br>
             <br> Our records indicate that the tool you rented has not been returned to the owner yet. It is currently overdue by ${days} days. If you have already returned the tool, please contact the owner to settle the transaction. If you need further assitance please contact support. If you have not returned your tool, please return it as soon as possible. You will be charged late fees for each day past the rental due date. <br>
             <br> Thank you,<br>
               ToolShed Team`;
            }

            // var renterMessage = `Your tool has not been checked in yet. It is currently overdue by ${days} days!!`
            sendEmail(userDoc.data(), renterMessage);
          }
        })
        .catch(err => {
          console.log("DB: Error getting document - in rental user", err);
        });
    } else if (
      Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24)) === 1 ||
      Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24)) === 2
    ) {
      console.log(
        Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24)),
        "math?"
      );
      console.log("STARTING NEW PART - one or two days left");
      await db
        .collection("User")
        .doc(arr[i].ownerId)
        .get()
        .then(userDoc => {
          let data = userDoc.data();
          let userName = data.userName;
          if (!userDoc.exists) {
            console.log("DB: No such document! - one or two days left");
          } else {
            console.log(userDoc.data(), "userData for one or two days left");
            console.log(
              `Your tool has is scheduled to be checked in tomorrow.`
            );
            var ownerMessage = `Hello ${userName}, <br>
            <br>Our records indicate that the tool you lent out is due to be turned in to you tomorrow. Once the tool is returned to you, please navigate to your user profile and click the 'returned' button for that tool. Once the tool has been checked back in, you will recieve payment. If your tool is not returned on time, please navigate to the about page to report a dispute.<br>
            <br>Thank you,<br>
              ToolShed Team`;
            sendEmail(userDoc.data(), ownerMessage);
          }
        })
        .catch(err => {
          console.log("DB: Error getting document", err);
        });

      console.log(arr[i].rentalUserId, "rentalUserId");

      await db
        .collection("User")
        .doc(arr[i].rentalUserId)
        .get()
        .then(userDoc => {
          let data = userDoc.data();
          let userName = data.userName;
          if (!userDoc.exists) {
            console.log("Rental User: no such doc exists");
          } else {
            console.log(
              userDoc.data(),
              "userData - in rental user for one or two days left"
            );
            console.log(
              `The tool you are renting is scheduled to be checked in tomorrow.`
            );
            var renterMessage = `Hello ${userName},<br>
          <br> Our records indicate that the tool you checked out is due back to the owner tomorrow. Please return your tool on time. If you do not return the tool on time, you will be charged late fees for each day past the rental due date. <br>
          <br>Thank you,<br>
             ToolShed Team`;
            sendEmail(userDoc.data(), renterMessage);
          }
        })
        .catch(err => {
          console.log(
            "DB: Error getting document - in rental user fo the one or two day condition",
            err
          );
        });
    }
  }
}

