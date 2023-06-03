"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = require('express').Router();
const posts = require("../controllers/posts");
const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    }
    else {
        next();
    }
};
routes
    .get("/posts", authCheck, posts.getAllPosts)
    .get("/posts/:postId", authCheck, posts.getPostById)
    .post("/posts", authCheck, posts.createPost)
    .put("/posts/:postId", authCheck, posts.updatePostById)
    .delete("/posts/:postId", authCheck, posts.deletePostById);
module.exports = routes;
