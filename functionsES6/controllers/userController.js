const express = require("express");
const cors = require("cors");
const { db } = require("../app");

const userController = express();

userController.use(cors({ origin: true }));

userController.get("/", (req, res) => {
  res.send("sup");
});



//START NEW USER POST ENDPOINT//
userController.post('/newUser', (req, res) => {
  console.log('We are in the add new user route!');
  console.log('this is req.body', req.body);
  try {
    db.collection('User').add({
      userName: req.body.userName,
      location: req.body.location,
      avatar: req.body.avatar,
      toolsOwned: [],
      toolsBeingRented: [],
      token: req.body.token
    }).then((res) => {
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
  const userID = 'TQFaQh51Rd3fgQHginMg';
  try {
    db.collection('User').doc(`${userID}`).delete()
      .then((res) => {
        return res.status(200).send(`/deleteUser was successful! `, res);
      });
  } catch (err) {
    return res.status(500).send(`/deleteUser encountered an error: `, err);
  }
});


















//END DELETE USER ENDPOINT//




//START UPDATE USER ENDPOINT//



















//SEND UPDATE USER ENDPOINT//




//START GET ONE USER BY USERID//



















//END GET ONE USER BY USERID//



module.exports = userController;
