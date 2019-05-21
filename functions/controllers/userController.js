"use strict";

const express = require("express");
const cors = require("cors");
const { db } = require("../app");

const userController = express();

userController.use(cors({ origin: true }));

userController.get("/", (req, res) => {
  res.send("sup");
});

module.exports = userController;