import { Router } from 'express';
import authCheck from '../middlewares/authCheck';

const routes: Router = require('express').Router();
const authors = require('../controllers/authors');

routes
  .get('/authors', authors.getAllAuthors)
  .get('/authors/:authorId', authors.getAuthorById)
  .post('/authors', authCheck, authors.createAuthor)
  .put('/authors/:authorId', authCheck, authors.updateAuthorById)
  .delete('/authors/:authorId', authCheck, authors.deleteAuthorById);

module.exports = routes;
