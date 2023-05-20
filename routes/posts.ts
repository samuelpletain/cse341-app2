import { Router } from 'express'

const routes: Router = require('express').Router()
const posts = require("../controllers/posts");

routes
  .get("/posts", posts.getAllPosts)
  .get("/posts/:postId", posts.getPostById)
  .post("/posts", posts.createPost)
  .put("/posts/:postId", posts.updatePostById)
  .delete("/posts/:postId", posts.deletePostById);

module.exports = routes;