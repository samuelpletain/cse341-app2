"use strict";
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: true
    }
});
const User = (0, mongoose_1.model)("User", userSchema);
module.exports = User;
