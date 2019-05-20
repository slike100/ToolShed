'use strict';

const express = require('express');
const cors = require('cors');
const { db } = require('../app');

const toolController = express();

toolController.use(cors({ origin: true }));

toolController.get('/', (req, res) => {
  res.send('sup');
});

toolController.post('/newTool', (req, res) => {
  console.log('We are in the add tool route!');
  console.log('database', db);
  var data = {
    name: 'Hammer',
    description: 'This is the sickest hammer we have ever seen.',
    isRented: false,
    owner: 'UserID',
    photo: "photo url string where it lives in cloud storage",
    priceRatePerDay: 5,
    rentalDurationInDays: 5
  };
  db.collection('Tools').doc().set(data).then(stuff => {
    console.log(stuff, "this is the full document");
    console.log(stuff.id, "this is the stuff ID");
    return res.status(200).send(stuff);
  }).catch(err => {
    console.log(err);
    return res.status(500).send(err);
  });
});

module.exports = toolController;