const express = require('express');
const cors = require('cors');
const stripe = require("stripe")(functions.config().stripe.key);
const stripeController = express();

stripeController.use(cors({ origin: true }))
stripeController.get('/', (req, res) => {
try {
  let { status } = await stripe.charges.create({
    amount: 2000,
    currency: "usd",
    description: "An example charge",
    source: req.body
  });
    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
});
