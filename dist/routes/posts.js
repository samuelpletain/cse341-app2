"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = require('express').Router();
const controller = require("../controllers/postsController");
routes
    .get("/posts", controller.getAllPosts)
    .post("/posts", controller.createPost);
module.exports = routes;
