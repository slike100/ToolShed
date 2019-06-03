"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const express = require("express");
const cors = require("cors");
const { db } = require("../app");
const userController = express();
const bodyParser = require("body-parser");

userController.use(cors({ origin: true }));
userController.use(bodyParser.json());

//START NEW USER POST ENDPOINT//
userController.post("/newUser", (req, res) => {
  console.log("We are in the add new user route!");
  console.log("this is req.body", req.body);
  try {
    db.collection("User").doc(req.body.uid).set({
      userName: req.body.userName,
      email: req.body.email,
      lat: req.body.lat,
      long: req.body.long,
      avatar: req.body.avatar,
      toolsOwned: [],
      toolsBeingRented: [],
      recordIds: [],
      stripeToken: req.body.stripeToken || ""
    }).then(() => {
      return res.status(200).send("A new user was successfully created in the database.");
    });
  } catch (err) {
    return res.status(500).send("Could not add new user", err);
  }
});
//END NEW USER POST ENDPOINT//

//START DELETE USER ENPOINT//
userController.delete("/deleteUser", (req, res) => {
  console.log("We are in the /deleteUser route!");
  console.log("this is the /deleteUser req.body: ", req.body);
  try {
    db.collection("User").doc(req.body.uid).delete().then(_asyncToGenerator(function* () {
      for (let i = 0; i < req.body.toolsOwned.length; i++) {
        yield db.collection("Tools").doc(req.body.toolsOwned[i]).delete().then(function () {
          console.log("Tool deleted!");
        });
      }
      return res.status(200).send("Sorry to see you go! Your account has been successfully deleted.");
    }));
  } catch (err) {
    return res.status(500).send("Sorry, we were unable to delete your account. Please try again or contact support.");
  }
});
//END DELETE USER ENDPOINT//

//START UPDATE USER ENDPOINT//
userController.put("/updateUser/:uid", (req, res) => {
  console.log("We are in the update user route!");
  console.log("this is req.body", req.body);
  var user;
  var docRef = db.collection("User").doc(req.params.uid);
  docRef.set(req.body, { merge: true }).then(() => {
    docRef.get().then(doc => {
      if (doc.exists) {
        user = doc.data();
      } else {
        user = "Could not find a user to update.";
      }
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
userController.get("/userData/:uid", (req, res) => {
  console.log("DB: Hitting the get userData endpoint");
  console.log("DB: This is the userId: ", req.params.uid);
  try {
    db.collection("User").doc(req.params.uid).get().then(userDoc => {
      if (!userDoc.exists) {
        console.log("This user does not exist.");
        return res.status(200).send('This user does not exist');
      } else {
        return res.status(200).send(userDoc.data());
      }
    }).catch(err => {
      console.log("Could not find this user.", err);
      return res.status(500).send('Did not work');
    });
  } catch (err) {
    return res.status(500).send("Could not connect to database.", err);
  }
});
//END GET ONE USER BY USERID//

//START GET ALL TOOLS FOR ONE USER//
userController.get("/allToolsOwnedForOneUser/:uid", (req, res) => {
  console.log("inside of the get all tools per user");
  console.log(req.params.uid, "uid");
  try {
    db.collection("User").doc(req.params.uid).get().then((() => {
      var _ref2 = _asyncToGenerator(function* (userDoc) {
        if (!userDoc.exists) {
          console.log("No user found");
        } else {
          console.log(userDoc.data());
          let data = userDoc.data();
          console.log(data, "data variable");
          let userTools = [];
          console.log("here is the obj we shall return:", userTools);
          console.log(data.toolsOwned.length, "length of data");
          console.log(data.toolsOwned[0], "first index of tools owned");
          for (let i = 0; i < data.toolsOwned.length; i++) {
            yield db.collection("Tools").doc(data.toolsOwned[i]).get().then(function (toolDoc) {
              if (!toolDoc.exists) {
                console.log("No tool found");
              } else {
                console.log("toolDoc ID:", toolDoc.id);
                var data = toolDoc.data();
                data.toolId = toolDoc.id;
                userTools.push(data);
              }
            });
          }
          console.log(userTools, "UserTools");
          return res.status(200).send(userTools);
        }
      });

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    })()).catch(err => {
      console.log("DB: Error getting document", err);
      return res.status(500).send("Could not find your tools");
    });
  } catch (err) {
    return res.status(500).send("Could not find your tools", err);
  }
});

//END GET ALL TOOLS FOR ONE USER//

//START GET ALL TOOLS BEING RENTED FOR ONE USER//
userController.get("/allToolsRentedForOneUser/:uid", (req, res) => {
  console.log("inside of the get all tools per user");
  console.log(req.params.uid, "uid");
  try {
    db.collection("User").doc(req.params.uid).get().then((() => {
      var _ref3 = _asyncToGenerator(function* (userDoc) {
        if (!userDoc.exists) {
          console.log("No user found");
        } else {
          console.log(userDoc.data());
          let data = userDoc.data();
          console.log(data, "data variable");
          let userTools = [];
          console.log("here is the obj we shall return:", userTools);
          console.log(data.toolsBeingRented.length, "length of data");
          console.log(data.toolsBeingRented[0], "first index of tools owned");
          for (let i = 0; i < data.toolsBeingRented.length; i++) {
            yield db.collection("Tools").doc(data.toolsBeingRented[i]).get().then(function (toolDoc) {
              if (!toolDoc.exists) {
                console.log("No user found");
              } else {
                console.log("toolDoc ID:", toolDoc.id);
                var data = toolDoc.data();
                data.toolId = toolDoc.id;
                userTools.push(data);
              }
            });
          }
          console.log(userTools, "UserTools");
          return res.status(200).send(userTools);
        }
      });

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    })()).catch(err => {
      console.log("DB: Error getting document", err);
      return res.status(500).send("Could not find the tools.");
    });
  } catch (err) {
    return res.status(500).send("Could not connect to database.", err);
  }
});
//END GET ALL TOOLS BEING RENTED FOR ONE USER//

module.exports = userController;