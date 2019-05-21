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
toolController.get('/searchTools', (req, res) => {
  console.log('We are in the get tool info route!');
  console.log('this is req.query', req.query);
  var toolsRef = db.collection('Tools');
  try {
    db.collection('Tools').where('name', '==', req.query.name).get().then(snapshot => {
      console.log("this is the snapshot Sam S", snapshot);
      if (snapshot.empty) {
        console.log('No matching documents. Sam S');
        return;
      }
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        return;
        // return res.status(200).send('we are in the confirm, we found tools');
      });
    });
  } catch (err) {
    return res.status(500).send('This is the error. Our Search did not work', err);
  }
});

//START GET TOOLS BY LAT & LONG AND OPTIONALLY BY NAME OF TOOL ENDPOINT//


module.exports = toolController;