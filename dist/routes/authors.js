"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authCheck_1 = __importDefault(require("../middlewares/authCheck"));
const routes = require('express').Router();
const authors = require('../controllers/authors');
routes
    .get('/authors', authors.getAllAuthors)
    .get('/authors/:authorId', authors.getAuthorById)
    .post('/authors', authCheck_1.default, authors.createAuthor)
    .put('/authors/:authorId', authCheck_1.default, authors.updateAuthorById)
    .delete('/authors/:authorId', authCheck_1.default, authors.deleteAuthorById);
module.exports = routes;
