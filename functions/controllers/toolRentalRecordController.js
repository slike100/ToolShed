"use strict";

const express = require("express");
const cors = require("cors");
const { db } = require("../app");

const toolRecordRentalController = express();

toolRecordRentalController.use(cors({ origin: true }));

toolRecordRentalController.get("/", (req, res) => {
  res.send("sup");
});

toolRecordRentalController.post('/newRentalRecord', (req, res) => {
  console.log('We are in the add rental record route!');
  console.log('this is req.body for rental record route', req.body);
  var timestamp = firebase.firestore.Timestamp.now();
  console.log(timestamp, 'this is the timestamp');
  var toolRentalRecord = Object.assign({}, {
    OwnerId: req.body.ownerId,
    rentalUserId: req.body.rentalUserId,
    toolId: req.body.toolId,
    rentalStartTime: timestamp,
    timeCheckedIn: "",
    dueDate: req.body.dueDate,
    pricePerDay: req.body.pricePerDay
  });
  try {
    db.collection('Tools').add(tool).then(() => {
      return res.status(200).send('we are in the confirm, we added a tool');
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = toolRecordRentalController;