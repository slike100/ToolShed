'use strict';

const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');
const stripe = require("stripe")(functions.config().stripe.token);
const stripeController = express();

stripeController.use(cors({ origin: true }));
stripeController.post('/', (req, res) => {
  try {
    stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    }).then(payment => {
      console.log(payment);
    });
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = stripeController;