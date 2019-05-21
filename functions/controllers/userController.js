"use strict";

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
    }).then(() => {
      return res.status(200).send('we are in the confirm, added new user');
    });
  } catch (error) {
    return res.status(500).send('could not add new user', error);
  }
});

//END NEW USER POST ENDPOINT//


//START DELETE USER ENPOINT//


//END DELETE USER ENDPOINT//


//START UPDATE USER ENDPOINT//


//SEND UPDATE USER ENDPOINT//


//START GET ONE USER BY USERID//


//END GET ONE USER BY USERID//


module.exports = userController;