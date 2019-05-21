const express = require("express");
const cors = require("cors");
const { db } = require("../app");

const userController = express();

userController.use(cors({ origin: true }));

userController.get("/", (req, res) => {
  res.send("sup");
});



//START NEW USER POST ENDPOINT//



















//END NEW USER POST ENDPOINT//




//START DELETE USER ENPOINT//



















//END DELETE USER ENDPOINT//




//START UPDATE USER ENDPOINT//



















//SEND UPDATE USER ENDPOINT//




//START GET ONE USER BY USERID//



















//END GET ONE USER BY USERID//



module.exports = userController;
