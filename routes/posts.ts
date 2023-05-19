import { Router } from 'express'

const routes: Router = require('express').Router()
const controller = require("../controllers/postsController");

routes
  .get("/posts", controller.getAllPosts)
  .post("/posts", controller.createPost);

module.exports = routes;