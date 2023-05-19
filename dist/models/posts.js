"use strict";
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    authorId: { type: String, required: true },
    tags: [{ type: String }],
    likes: { type: Number, required: true, default: 0 },
    replyTo: { type: String, required: true, default: "" },
    createdOn: { type: String, required: true, default: Date.now().toString() },
    editedAt: { type: String, default: "" }
});
const Post = (0, mongoose_1.model)("Post", postSchema);
module.exports = Post;
