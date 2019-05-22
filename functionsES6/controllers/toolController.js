const express = require('express');
const cors = require('cors');
const { db } = require('../app');

const toolController = express();

toolController.use(cors({ origin: true }))

toolController.post('/newTool', (req, res) => {
  console.log('We are in the add tool route!');
  console.log('this is req.body for add tool route', req.body);
  const name = req.body.name.toLowerCase();
  var tool = Object.assign({}, {
    name: name,
    description: req.body.description,
    isRented: req.body.isRented,
    owner: req.body.owner,
    photo: req.body.photo,
    priceRatePerDay: req.body.priceRatePerDay,
    // rentalDurationInDays: req.body.rentalDurationInDays,
    lat: req.body.lat,
    long: req.body.long,
  })
  try {
    db.collection('Tools').add(tool).then(() => {
      return res.status(200).send('we are in the confirm, we added a tool');
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

//START DELETE TOOL ENDPOINT//
toolController.delete('/deleteTool', (req, res) => {
  console.log('Julio, We are in the delete tool route!');
  console.log('this is req.body.id for the delete tool', req.body.id);
  try {
    db.collection('Tools').doc(req.body.id).delete()
      .then(() => {
        return res.status(200).send('we are in the confirm, we deleted a tool');
      });
  } catch (err) {
    return res.status(500).send("Error removing Tool: ", err);
  }
});
//END DELETE TOOL ENDPOINT//

//START UPDATE TOOL ENDPOINT//
toolController.put('/updateTool/:id', (req, res) => {
  console.log('We are in the update tool route!');
  console.log('this is req.body', req.body);
  var tool;
  var docRef = db.collection('Tools').doc(req.params.id);
  docRef.set(req.body, { merge: true }).then(() => {
    docRef.get().then((doc) => {
      if(doc.exists) {
        tool = doc.data();
        } else {
          tool = ("document not found.");
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
  console.log('We are in the get tool info route!');
  console.log('this is req.query', req.query);
  const distanceInDegrees = ((req.query.distance/69)/2);
  console.log(distanceInDegrees, 'distance in degrees');
  const addLat = parseFloat((req.query.lat)) + parseFloat((distanceInDegrees));
  const subLat = parseFloat((req.query.lat)) - parseFloat((distanceInDegrees));
  const addLong = parseFloat((req.query.long)) + parseFloat((distanceInDegrees));
  const subLong = parseFloat((req.query.long)) - parseFloat((distanceInDegrees));
  try {
    if(req.query.lat && req.query.long && req.query.distance && !req.query.name){
      console.log('we are in the first if statement');
      console.log(subLat, addLat, "this is sublat addlong")
      console.log(addLong, subLong, 'this is the sublong addLong');
      var docRef = db.collection('Tools');
      docRef
      .where('lat', '>=', subLat)
      .where('lat', '<=', addLat)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log('first No matching documents. Sam S');
          return;
        } else
        docRef
        .where('long', '<=', addLong)
        .where('long', '>=', subLong)
        .get()
        .then((snapshot1) => {
          if (snapshot1.empty) {
            console.log('second No matching documents. Sam S');
            return;
          } else 
          var matchingTools = [];
          snapshot1.docs.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          matchingTools.push(doc.data());
        })
          return res.status(200).send(matchingTools);
      })
    })
    } else if (req.query.lat && req.query.long && req.query.distance && req.query.name) {
      console.log('we are in the second if statement');
      console.log(subLat, addLat, "this is sublat addlong")
      console.log(addLong, subLong, 'this is the sublong addLong');
      var docRef = db.collection('Tools');
      docRef
      .where('lat', '>=', subLat)
      .where('lat', '<=', addLat)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log('first No matching documents. Sam S');
          return;
        } else
        docRef
        .where('long', '<=', addLong)
        .where('long', '>=', subLong)
        .get()
        .then((snapshot1) => {
          if (snapshot1.empty) {
            console.log('second No matching documents. Sam S');
            return;
          } else 
            docRef
            .where('name', '==', req.query.name)
            .get()
            .then(snapshot2 => {
              if(snapshot2.empty){
                console.log('second no matching tools')
                return;
              } else
              var matchingTools = [];
              snapshot2.docs.forEach(doc => {
              console.log(doc.id, '=> in second if', doc.data());
              matchingTools.push(doc.data());
            })
            return res.status(200).send(matchingTools);
        })
      })
    })
  }
  } catch (err) {
    return res.status(500).send('This is the error. Our Search did not work', err);
  }
});
//START GET TOOLS BY LAT & LONG AND OPTIONALLY BY NAME OF TOOL ENDPOINT//

module.exports = toolController;