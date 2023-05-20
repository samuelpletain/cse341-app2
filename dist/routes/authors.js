"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = require('express').Router();
const authors = require("../controllers/authors");
routes
    .get("/authors", authors.getAllAuthors)
    .get("/authors/:authorId", authors.getAuthorById)
    .post("/authors", authors.createAuthor)
    .put("/authors/:authorId", authors.updateAuthorById)
    .delete("/authors/:authorId", authors.deleteAuthorById);
module.exports = routes;
