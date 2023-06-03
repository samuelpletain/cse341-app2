import { Router, Request, Response, NextFunction } from 'express'

const routes: Router = require('express').Router()
const posts = require("../controllers/posts");

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
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