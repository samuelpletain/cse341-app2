"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
require("dotenv").config();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.ATLAS_URI).then(() => {
    console.log(`successfully connected`);
}).catch((err) => {
    console.log(`not connected`);
});
module.exports = { mongoose };
