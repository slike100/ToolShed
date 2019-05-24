const express = require("express");
const cors = require("cors");
const { db } = require("../app");
const firebase = require("firebase");

const toolRecordRentalController = express();

toolRecordRentalController.use(cors({ origin: true }));

toolRecordRentalController.post("/newRentalRecord", (req, res) => {
  console.log("We are in the add rental record route!");
  console.log("this is req.body for rental record route", req.body);
  var timestamp = firebase.firestore.Timestamp.now().toMillis();
  var dueDateMillis = req.body.dueDate * 86400000;
  console.log(timestamp, "timeObject");
  var toolRentalRecord = Object.assign(
    {},
    {
      ownerId: req.body.ownerId,
      rentalUserId: req.body.rentalUserId,
      toolId: req.body.toolId,
      rentalStartTime: timestamp,
      timeCheckedIn: "",
      dueDate: dueDateMillis,
      pricePerDay: req.body.pricePerDay
    }
  );
  try {
    db.collection("RentalRecords")
      .add(toolRentalRecord)
      .then(doc => {
        var recordId = doc.id;
        console.log("recordID", recordId);
        var toolRecords = req.body.recordIds;
        console.log("toolRecords", toolRecords);
        var docRef = db.collection("User").doc(req.body.ownerId);
        toolRecords.push(recordId);
        console.log("toolrecords after push", toolRecords);
        docRef.set({ recordIds: toolRecords }, { merge: true }).then(() => {
          var docRef = db.collection("User").doc(req.body.rentalUserId);
          docRef.get().then(doc => {
            var rentee = doc.data();
            console.log("rentee", rentee);
            var rentalRecordsOfRentee = rentee.recordIds;
            console.log("rentalRecordsofREntee", rentalRecordsOfRentee);
            rentalRecordsOfRentee.push(recordId);
            console.log(
              "rentalRecordsofREntee after push",
              rentalRecordsOfRentee
            );
            docRef
              .set({ recordIds: rentalRecordsOfRentee }, { merge: true })
              .then(doc => {
                res.status(200).send("Successfull created the record.");
              })
              .catch(function(err) {
                res.status(500).send(err);
              });
          });
        });
      });
  } catch (err) {
    return res.status(500).send(err);
  }
});

toolRecordRentalController.put("/updateToolRentalRecord/:id", (req, res) => {
  console.log("We are in the update tool rental record route!");
  console.log("this is req.body", req.body);
  var timestamp = firebase.firestore.Timestamp.now().toDate();
  var obj = { timeCheckedIn: timestamp };
  console.log(timestamp, "timestamp");
  console.log(obj, "obj being passed in");
  var record;
  var docRef = db.collection("RentalRecords").doc(req.params.id);
  docRef
    .set(obj, { merge: true })
    .then(() => {
      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            record = doc.data();
          } else {
            record = "document not found.";
          }
          res.status(200).send(record);
        })
        .catch(function(err) {
          res.status(500).send(err);
        });
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

module.exports = toolRecordRentalController;
