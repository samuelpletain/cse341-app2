"use strict";
const mongoose_1 = require("mongoose");
const authorSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    joinedOn: { type: String, default: new Date(Date.now()).toDateString() }
});
const Author = (0, mongoose_1.model)("Author", authorSchema);
module.exports = Author;
