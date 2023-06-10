"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authCheck_1 = __importDefault(require("../middlewares/authCheck"));
const routes = require('express').Router();
const posts = require('../controllers/posts');
routes
    .get('/posts', posts.getAllPosts)
    .get('/posts/:postId', posts.getPostById)
    .post('/posts', authCheck_1.default, posts.createPost)
    .put('/posts/:postId', authCheck_1.default, posts.updatePostById)
    .delete('/posts/:postId', authCheck_1.default, posts.deletePostById);
module.exports = routes;
