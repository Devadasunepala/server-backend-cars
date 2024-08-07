require('dotenv').config(); 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3000; 
const Usersdata = require('./model/schema');
app.use(express.json());
app.use(cors({
  origin: ["https://frontend-client-cars.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
const url = process.env.MONGODB_URI; 
if (!url) {
  console.error('MongoDB URI is not defined in environment variables');
  process.exit(1); 
}
mongoose.connect(url)
  .then(() => console.log('Connected successfully to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));
app.post('/api/userenquirydata', async (req, res) => {
  const { Name, carname, phonenumber, address, carvarient } = req.body;
  try {
    const newdata = new Usersdata({
      Name,
      carname,
      phonenumber,
      address,
      carvarient
    });
    await newdata.save();
    res.send('My executive will callback shortly');
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).send('Error saving data');
  }
});
app.get('/', (req, res) => {
  res.json('heeloooo world');
});

