"use strict";
const mongoose_1 = require("mongoose");
const utils_1 = require("../utils");
const authorSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [utils_1.validateEmail, 'Please enter a valid email address.']
    },
    joinedOn: {
        type: String,
        trim: true,
        default: utils_1.formattedNow,
        validate: [utils_1.validateDate, 'Please enter a valid date (ISO 8601 without milliseconds).'],
    }
});
const Author = (0, mongoose_1.model)("Author", authorSchema);
module.exports = Author;
