'use strict';

const express = require('express');
const cors = require('cors');
const firebase = require("firebase");
const { db } = require('../app');
const toolController = express();

toolController.use(cors({ origin: true }));

//START POST NEW TOOL//
toolController.post('/newTool', (req, res) => {
  const name = req.body.name.toLowerCase();
  var tool = Object.assign({}, {
    name: name,
    description: req.body.description,
    isRented: req.body.isRented,
    owner: req.body.owner,
    photo: req.body.photo,
    priceRatePerDay: req.body.priceRatePerDay,
    rentalDurationInDays: req.body.rentalDurationInDays,
    lat: req.body.lat,
    long: req.body.long
  });
  try {
    db.collection('Tools').add(tool).then(ref => {
      req.body.toolsOwned.push(ref.id);
      db.collection('User').doc(req.body.uid).update({ toolsOwned: req.body.toolsOwned }).then(() => {
        return res.status(200).send('Added a tool and added it to your current user account');
      });
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});
//END POST NEW TOOL//

//START DELETE TOOL ENDPOINT//
toolController.delete('/deleteTool', (req, res) => {
  console.log('We are in the delete tool route!');
  console.log('this is req.body.id for the delete tool', req.body.id);
  try {
    db.collection('Tools').doc(req.body.id).delete().then(() => {
      //do a get to the user collection and find the toolsOwned array
      //get the array back & filter out the matching id
      //filter returns a copy of this array
      //then we do an update on that user again for the toolsOwned field 
      db.collection('User').doc(req.body.uid).get().then(docRef => {
        var data = docRef.data();
        var newArr = data.toolsOwned.filter(toolId => toolId != req.body.id);
        console.log("here is the data:", data);
        console.log("here is the datanewArr:", newArr);
        db.collection('User').doc(req.body.uid).update({ toolsOwned: newArr }).then(() => {
          return res.status(200).send(`The tool was deleted from the user's toolsOwned array`);
        });
      });
      return res.status(200).send('The tool was successfully deleted');
    });
  } catch (err) {
    return res.status(500).send("Error removing Tool: ", err);
  }
});
//ALSO NEED TO ADD FUNCTIONALITY TO DELETE THIS TOOL FROM THE USER'S TOOLS RENTED
//END DELETE TOOL ENDPOINT//

//START UPDATE TOOL ENDPOINT//
toolController.put('/updateTool/:id', (req, res) => {
  var tool;
  var docRef = db.collection('Tools').doc(req.params.id);
  docRef.set(req.body, { merge: true }).then(() => {
    docRef.get().then(doc => {
      if (doc.exists) {
        tool = doc.data();
      } else {
        tool = "document not found.";
      };
      res.status(200).send(tool);
    }).catch(function (err) {
      res.status(500).send(err);
    });
  }).catch(function (err) {
    res.status(500).send(err);
  });
});
//END UPDATE TOOL ENDPOINT//

//START GET TOOLS BY LAT & LONG AND OPTIONALLY BY NAME OF TOOL ENDPOINT//
toolController.get('/searchTools', (req, res) => {
  const distanceInDegrees = req.query.distance / 69 / 2;
  const addLat = parseFloat(req.query.lat) + parseFloat(distanceInDegrees);
  const subLat = parseFloat(req.query.lat) - parseFloat(distanceInDegrees);
  const addLong = parseFloat(req.query.long) + parseFloat(distanceInDegrees);
  const subLong = parseFloat(req.query.long) - parseFloat(distanceInDegrees);
  try {
    if (req.query.lat && req.query.long && req.query.distance && !req.query.name) {
      var docRef = db.collection('Tools');
      docRef.where('lat', '>=', subLat).where('lat', '<=', addLat).get().then(snapshot => {
        if (snapshot.empty) {
          console.log('first No matching documents. Sam S');
          return;
        } else docRef.where('long', '<=', addLong).where('long', '>=', subLong).get().then(snapshot1 => {
          if (snapshot1.empty) {
            console.log('second No matching documents. Sam S');
            return;
          } else var matchingTools = [];
          snapshot1.docs.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            matchingTools.push(doc.data());
          });
          return res.status(200).send(matchingTools);
        });
      });
    } else if (req.query.lat && req.query.long && req.query.distance && req.query.name) {
      console.log('we are in the second if statement');
      console.log(subLat, addLat, "this is sublat addlong");
      console.log(addLong, subLong, 'this is the sublong addLong');
      var docRef = db.collection('Tools');
      docRef.where('lat', '>=', subLat).where('lat', '<=', addLat).get().then(snapshot => {
        if (snapshot.empty) {
          console.log('first No matching documents. Sam S');
          // return;
          return res.status(500).send('No matching tools');
        } else docRef.where('long', '<=', addLong).where('long', '>=', subLong).get().then(snapshot1 => {
          if (snapshot1.empty) {
            console.log('second No matching documents. Sam S');
            // return;
            return res.status(500).send('No matching tools');
          } else docRef.where('name', '==', req.query.name).get().then(snapshot2 => {
            if (snapshot2.empty) {
              console.log('second no matching tools');
              return res.status(500).send('No matching tools');
            } else var matchingTools = [];
            snapshot2.docs.forEach(doc => {
              console.log(doc.id, '=> in second if', doc.data());
              matchingTools.push(doc.data());
            });
            return res.status(200).send(matchingTools);
          });
        });
      });
    }
  } catch (err) {
    return res.status(500).send('This is the error. Our Search did not work', err);
  }
});
//START GET TOOLS BY LAT & LONG AND OPTIONALLY BY NAME OF TOOL ENDPOINT//

module.exports = toolController;