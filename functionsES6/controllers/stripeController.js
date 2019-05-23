const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions')
const stripe = require("stripe")('sk_test_5ImeP2JeLnBREKpYwvA8Hfbr00nylsLehb');
const stripeController = express();

stripeController.use(cors({ origin: true }));
stripeController.post('/', async (req, res) => {
try {
  let { payment } = await stripe.charges.create({
    amount: 2000,
    currency: "usd",
    description: "An example charge",
    source: req.body.token
  });
  console.log('payment', {payment});
  res.status(200).send('Made the payment');
  } catch (err) {
    res.status(500).end();
  }
});


module.exports = stripeController;

