import authCheck from '../middlewares/authCheck';
import { Router } from 'express';

const routes: Router = require('express').Router();
const posts = require('../controllers/posts');

routes
  .get('/posts', posts.getAllPosts)
  .get('/posts/:postId', posts.getPostById)
  .post('/posts', authCheck, posts.createPost)
  .put('/posts/:postId', authCheck, posts.updatePostById)
  .delete('/posts/:postId', authCheck, posts.deletePostById);

module.exports = routes;
