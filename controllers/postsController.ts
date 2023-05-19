import { Request, Response } from "express";
import Post from "../models/posts";

const db = require("../db/connect");

const getAllPosts = async (req: Request, res: Response) => {
  // #swagger.summary = "This endpoint returns a list of all the contacts in the database."
  try {
    const posts = await db.getDb().db("App2").collection("posts").find({}).toArray();
    /* #swagger.responses[200] = {
            description: 'Returns an array of contact objects.',
            schema: [{ $ref: '#/definitions/Contact' }]
    } */
    res.status(200).json(posts);
  } catch (err) {
    /* #swagger.responses[500] = {
            description: 'An error occured.'
    } */
    res.status(500).json(err);
  }
};

const createPost = async (req: Request, res: Response) => {
  try {
    const post = new Post({
      content: req.body.content,
      authorId: req.body.authorId,
      tags: req.body.tags,
      replyTo: req.body.replyTo
    })
    const collection = db.getDb().db("App2").collection("posts");
    const newContact = await collection.insertOne(post);
    /* #swagger.responses[201] = {
            description: 'Returns an object containing the result of the request and a string representing a MongoDB ObjectId.',
            schema: {
                    acknowledged: true,
                    insertedId: "643f75ca2cec8ebd2a3cc16c"
                }
    } */
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllPosts,
  createPost
}