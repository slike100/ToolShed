"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const express = require("express");
const cors = require("cors");
const functions = require("firebase-functions");
const stripe = require("stripe")("sk_test_5ImeP2JeLnBREKpYwvA8Hfbr00nylsLehb");
const stripeController = express();

stripeController.use(cors({ origin: true }));
stripeController.post("/", (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    console.log(req.body);
    try {
      let { payment } = yield stripe.charges.create({
        amount: req.body.amount,
        currency: "usd",
        description: req.body.description,

        customer: req.body.source

      });
      console.log("payment", { payment });
      res.status(200).send("Made the payment");
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

stripeController.post("/createUser", (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    console.log(req.body);
    try {
      const customer = yield stripe.customers.create({
        source: req.body.token,
        email: req.body.email
      });
      console.log(customer);
      res.status(200).send(customer);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})());

module.exports = stripeController;