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
    db.collection('User').doc(req.body.uid).delete()
      .then(() => {
        for (let i = 0; i < req.body.toolsOwned.length; i++) {
          await db.collection('Tools').doc(req.body.toolsOwned[i]).delete()
            .then(() => {
              return res.status(200).send('Sorry to see you go! You account has been successfully deleted');
            })
        }
      });
  } catch (err) {
    return res.status(500).send('Sorry, we were unable to delete your account. Please try again or contact support.');
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
userController.get('/allToolsOwnedForOneUser', (req, res) => {
  console.log('inside of the get all tools per user')
  console.log(req.query.uid, 'uid');
  try {
    db.collection('User').doc(req.query.uid).get()
      .then(async userDoc => {
        if (!userDoc.exists) {
          console.log('No user found')
        } else {
          console.log(userDoc.data())
          let data = userDoc.data()
          console.log(data, 'data variable')
          let userTools = [];
          console.log("here is the obj we shall return:", userTools)
          console.log(data.toolsOwned.length, 'length of data');
          console.log(data.toolsOwned[0], 'first index of tools owned');
          for (let i = 0; i < data.toolsOwned.length; i++) {
            await db.collection('Tools').doc(data.toolsOwned[i]).get()
              .then(toolDoc => {
                if (!toolDoc.exists) {
                  console.log('No user found')
                } else {
                  var data = toolDoc.data();
                  userTools.push(data);
                }
              });
          }
          console.log(userTools, 'UserTools');
          return res.status(200).send(userTools);
        }
      })
      .catch(err => {
        console.log('DB: Error getting document', err);
      });
  } catch (err) {
    return res.status(500).send('DB: Could not connect to database', err);
  };
});
  
//END GET ALL TOOLS FOR ONE USER//


//START GET ALL TOOLS BEING RENTED FOR ONE USER//

userController.get('/allToolsRentedForOneUser', (req, res) => {
  console.log('inside of the get all tools per user')
  console.log(req.query.uid, 'uid');
  try {
    db.collection('User').doc(req.query.uid).get()
      .then(async userDoc => {
        if (!userDoc.exists) {
          console.log('No user found')
        } else {
          console.log(userDoc.data())
          let data = userDoc.data()
          console.log(data, 'data variable')
          let userTools = [];
          console.log("here is the obj we shall return:", userTools)
          console.log(data.toolsBeingRented.length, 'length of data');
          console.log(data.toolsBeingRented[0], 'first index of tools owned');
          for (let i = 0; i < data.toolsBeingRented.length; i++) {
            await db.collection('Tools').doc(data.toolsBeingRented[i]).get()
              .then(toolDoc => {
                if (!toolDoc.exists) {
                  console.log('No user found')
                } else {
                  var data = toolDoc.data();
                  userTools.push(data);
                }
              });
          }
          console.log(userTools, 'UserTools');
          return res.status(200).send(userTools);
        }
      })
      .catch(err => {
        console.log('DB: Error getting document', err);
      });
  } catch (err) {
    return res.status(500).send('DB: Could not connect to database', err);
  };
});
//END GET ALL TOOLS BEING RENTED FOR ONE USER//


module.exports = userController;
