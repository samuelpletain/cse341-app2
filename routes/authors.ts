import { Router } from 'express'

const routes: Router = require('express').Router()
const authors = require("../controllers/authors");

routes
  .get("/authors", authors.getAllAuthors)
  .get("/authors/:authorId", authors.getAuthorById)
  .post("/authors", authors.createAuthor)
  .put("/authors/:authorId", authors.updateAuthorById)
  .delete("/authors/:authorId", authors.deleteAuthorById);

module.exports = routes;