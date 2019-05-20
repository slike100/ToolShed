const express = require('express');
const cors = require('cors');
const { db } = require('../app');

const toolController = express();

toolController.use(cors({origin:true}))

toolController.get('/',(req,res) =>{
  res.send('sup');
});

toolController.post('/newTool', (req, res) => {
  console.log('We are in the add tool route!');
  try {
    db.collection('Tools').add({
      name: 'Saw',
      description: 'This is the sickest Sawwwww we have ever seen.',
      isRented: false,
      owner: 'UserID',
      photo: "photo url string where it lives in cloud storage",
      priceRatePerDay: 6,
      rentalDurationInDays: 100
    })
    .then(() => {
      return res.status(200).send('we are in the confirm, we added a tool');
    })
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = toolController;