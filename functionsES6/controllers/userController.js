const express = require("express");
const cors = require("cors");
const { db } = require("../app");
const userController = express();

userController.use(cors({ origin: true }));

//START NEW USER POST ENDPOINT//
userController.post('/newUser', (req, res) => {
  console.log('We are in the add new user route!');
  console.log('this is req.body', req.body);
  try {
    db.collection('User').doc(req.body.uid).set({
      userName: req.body.userName,
      email: req.body.email,
      lat: req.body.lat,
      long: req.body.long,
      avatar: req.body.avatar,
      toolsOwned: [],
      toolsBeingRented: [],
      stripeToken: req.body.stripeToken || ""
    }).then(() => {
      return res.status(200).send('we are in the confirm, added new user');
    });
  } catch (err) {
    return res.status(500).send('could not add new user', err);
  }
});
//END NEW USER POST ENDPOINT//

//START DELETE USER ENPOINT//
userController.delete('/deleteUser', (req, res) => {
  console.log('We are in the /deleteUser route!');
  console.log('this is the /deleteUser req.body: ', req.body);
  try {
    db.collection('User').doc(req.body.id).delete()
      .then(() => {
        return res.status(200).send(`/deleteUser was successful! `);
      });
  } catch (err) {
    return res.status(500).send(`/deleteUser encountered an error: `);
  }
});
//END DELETE USER ENDPOINT//

//START UPDATE USER ENDPOINT//
userController.put('/updateUser/:id', (req, res) => {
  console.log('We are in the update user route!');
  console.log('this is req.body', req.body);
  var user;
  var docRef = db.collection('User').doc(req.params.id);
  docRef.set(req.body, { merge: true }).then(() => {
    docRef.get().then((doc) => {
      if(doc.exists) {
        user = doc.data();
        } else {
          user = ("document not found.");
        };
          res.status(200).send(user);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    }).catch(function (err) {
        res.status(500).send(err);
    });
  });
//END UPDATE USER ENDPOINT//

//START GET ONE USER BY USERID//
userController.get('/userData', (req, res) => {
  console.log("DB: Hitting the get userData endpoint");
  console.log("DB: This is the userId: ", req.query.id);
  try {
    db.collection('User').doc(req.query.id).get()
      .then(userDoc => {
        if (!userDoc.exists) {
          console.log('DB: No such document!');
        } else {
          console.log(userDoc.data)
          return res.status(200).send(userDoc.data());
        }
      })
      .catch(err => {
        console.log('DB: Error getting document', err);
      });
  } catch (err) {
    return res.status(500).send('DB: Could not connect to database', err);
  };
});
//END GET ONE USER BY USERID//




//START GET ALL TOOLS FOR ONE USER//
//END GET ALL TOOLS FOR ONE USER//



//START GET ALL TOOLS BEING RENTED FOR ONE USER//
//END GET ALL TOOLS BEING RENTED FOR ONE USER//


module.exports = userController;
