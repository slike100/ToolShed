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
  console.log('this is req.body', req.body);
  try {
    db.collection('Tools').add({
      name: req.body.name,
      description: req.body.description,
      isRented: req.body.isRented,
      owner: req.body.owner,
      photo: req.body.photo,
      priceRatePerDay: req.body.priceRatePerDay,
      rentalDurationInDays: req.body.rentalDurationInDays
    }).then(() => {
      return res.status(200).send('we are in the confirm, we added a tool');
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

//START DELETE TOOL ENDPOINT//


//START DELETE TOOL ENDPOINT//


//START UPDATE TOOL ENDPOINT//


//END UPDATE TOOL ENDPOINT//


//START GET TOOLS BY LAT & LONG AND OPTIONALLY BY NAME OF TOOL ENDPOINT//


//START GET TOOLS BY LAT & LONG AND OPTIONALLY BY NAME OF TOOL ENDPOINT//


module.exports = toolController;