'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const postmarkTransport = require('nodemailer-postmark-transport');
const postmarkKey = functions.config().postmark.key;
const mailTransport = nodemailer.createTransport(postmarkTransport({
  auth: {
    apiKey: postmarkKey
  }
}));

function sendEmail(user, message) {
  console.log(user, 'user');
  console.log(message, "message");
  const mailOptions = {
    from: '"Cache Money" <david.brown@techtonic.com>',
    to: user.email,
    subject: 'You are LAAATE!',
    html: `<p>${message}</p>`
  };
  return mailTransport.sendMail(mailOptions).then(() => console.log('dbCompaniesOnUpdate: Welcome confirmation email')).catch(error => console.error('There was an error while sending the email:', error));
}

module.exports = sendEmail;