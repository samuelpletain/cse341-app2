"use strict";
const mongoose_1 = require("mongoose");
const utils_1 = require("../utils");
const postSchema = new mongoose_1.Schema({
    content: {
        type: String,
        trim: true,
        required: true
    },
    authorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        trim: true,
        required: true
    },
    tags: [{
            type: String,
            trim: true
        }],
    likes: {
        type: Number,
        default: 0
    },
    replyTo: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: null
    },
    createdOn: {
        type: String,
        default: utils_1.formattedNow,
        validate: [utils_1.validateDate, 'Please enter a valid date (ISO 8601 without milliseconds).']
    },
    editedAt: {
        type: String,
        default: null,
        validate: [utils_1.validateDate, 'Please enter a valid date (ISO 8601 without milliseconds).']
    }
});
const Post = (0, mongoose_1.model)("Post", postSchema);
module.exports = Post;
