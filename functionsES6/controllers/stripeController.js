const express = require("express");
const cors = require("cors");
const functions = require("firebase-functions");
const stripe = require("stripe")("sk_test_5ImeP2JeLnBREKpYwvA8Hfbr00nylsLehb");
const stripeController = express();

stripeController.use(cors({ origin: true }));
stripeController.post("/", async (req, res) => {
  console.log(req.body);
  try {
    let { payment } = await stripe.charges.create({
      amount: req.body.amount,
      currency: "usd",
      description: req.body.description,
      source: req.body.source
    });
    console.log("payment", { payment });
    res.status(200).send("Made the payment");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = stripeController;
