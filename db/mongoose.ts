import { Error } from 'mongoose';
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.ATLAS_URI).then(() => {
  console.log('successfully connected');
}).catch((err: Error) => {
  console.log(`not connected: ${err}`);
});

module.exports = { mongoose };
