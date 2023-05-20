import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Post from "../models/posts";

const db = require("../db/connect");

const getAllPosts = async (req: Request, res: Response) => {
  // #swagger.summary = "This endpoint returns a list of all the posts in the database."
  try {
    const posts = await db.getDb().db("App2").collection("posts").find({}).toArray() as Post[];
    /* #swagger.responses[200] = {
            description: 'Returns an array of post objects.',
            schema: [{ $ref: '#/definitions/Post' }]
    } */
    res.status(200).json(posts);
  } catch (err) {
    /* #swagger.responses[500] = {
            description: 'An error occured.'
    } */
    res.status(500).json(err);
  }
};

const getPostById = async (req: Request, res: Response) => {
  // #swagger.summary = "This endpoint returns the details of a single post."
  /*  #swagger.parameters['postId'] = {
                in: 'path',
                description: 'A MongoDB ObjectId',
                required: true
        } */
  try {
    let id: ObjectId;
    try {
      id = new ObjectId(req.params.postId);
    } catch (err) {
      /* #swagger.responses[400] = {
            description: 'An invalid MongoDB ObjectId was provided.'
    } */
      res.status(400).json("Please provide a valid post id.");
      return;
    }
    const post = await db
      .getDb()
      .db("App2")
      .collection("posts")
      .find({ _id: id })
      .toArray() as Post;
    /* #swagger.responses[200] = {
            description: 'Returns a post object.',
            schema: { $ref: '#/definitions/Post' },
    } */
    res.status(200).json(post);
  } catch (err) {
    /* #swagger.responses[500] = {
            description: 'An error occured.'
    } */
    res.status(500).json(err);
  }
};

const createPost = async (req: Request, res: Response) => {
  // #swagger.summary = "This endpoint creates a post."
  /*  #swagger.parameters['newPost'] = {
                in: 'body',
                description: 'An object representing a new post',
                required: true,
                schema: {
                  $content: 'Jhon Doe',
                  $authorId: '6465a918462368509b563b23',
                  tags: ["Technology", "Innovation", "Programming"]
                }
        } */
  try {
    const post = new Post({
      content: req.body.content,
      authorId: req.body.authorId,
      tags: req.body.tags,
      replyTo: req.body.replyTo
    })
    const collection = db.getDb().db("App2").collection("posts");
    const newPost = await collection.insertOne(post);
    /* #swagger.responses[201] = {
            description: 'Returns an object containing the result of the request and a string representing a MongoDB ObjectId.',
            schema: {
                    acknowledged: true,
                    insertedId: "643f75ca2cec8ebd2a3cc16c"
                }
    } */
    res.status(201).json(newPost);
  } catch (err) {
    /* #swagger.responses[500] = {
            description: 'An error occured.'
    } */
    res.status(500).json(err);
  }
}

const deletePostById = async (req: Request, res: Response) => {
  // #swagger.summary = "This endpoint deletes a single post."
  /*  #swagger.parameters['postId'] = {
                in: 'path',
                description: 'A MongoDB ObjectId',
                required: true
        } */
  try {
    let id: ObjectId;
    try {
      id = new ObjectId(req.params.postId);
    } catch (err) {
      /* #swagger.responses[400] = {
            description: 'An invalid MongoDB ObjectId was provided.'
    } */
      res.status(400).json("Please provide a valid post id.");
      return;
    }
    await db.getDb().db("App2").collection("posts").deleteOne({ _id: id });
    /* #swagger.responses[200] = {
            description: 'The specified post has been deleted.',
    } */
    res.status(200).send();
  } catch (err) {
    /* #swagger.responses[500] = {
            description: 'An error occured.'
    } */
    res.status(500).json(err);
  }
};

const updatePostById = async (req: Request, res: Response) => {
  // #swagger.summary = "This endpoint updates the content of a single post."
  /*  #swagger.parameters['postId'] = {
                in: 'path',
                description: 'A MongoDB ObjectId',
                required: true
        } */
  /*  #swagger.parameters['post'] = {
                in: 'body',
                description: 'An updated post object',
                schema: { $ref: '#/definitions/Post' },
                required: true
        } */
  try {
    let post = {
      content: req.body.content,
      editedAt: new Date(Date.now()).toISOString()
    }
    let id: ObjectId;
    try {
      id = new ObjectId(req.params.postId);
    } catch (err) {
      /* #swagger.responses[400] = {
            description: 'An invalid MongoDB ObjectId was provided.'
    } */
      res.status(400).json("Please provide a valid post id.");
      return;
    }
    await db.getDb().db("App2").collection("posts").updateOne({ _id: id }, { $set: post });
    /* #swagger.responses[204] = {
                description: 'The specified post has been edited.',
        } */
    res.status(204).send();
  } catch (err) {
    /* #swagger.responses[500] = {
            description: 'An error occured.'
    } */
    res.status(500).json(err);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  deletePostById,
  updatePostById
}