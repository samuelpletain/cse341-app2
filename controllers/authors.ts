import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Author from "../models/authors";

const db = require("../db/connect");

const getAllAuthors = async (req: Request, res: Response) => {
  // #swagger.summary = "This endpoint returns a list of all the authors in the database."
  try {
    const authors = await db.getDb().db("App2").collection("authors").find({}).toArray() as Author[];
    /* #swagger.responses[200] = {
            description: 'Returns an array of author objects.',
            schema: [{ $ref: '#/definitions/Author' }]
    } */
    res.status(200).json(authors);
  } catch (err) {
    /* #swagger.responses[500] = {
            description: 'An error occured.'
    } */
    res.status(500).json(err);
  }
};

const getAuthorById = async (req: Request, res: Response) => {
  // #swagger.summary = "This endpoint returns the details of a single author."
  /*  #swagger.parameters['authorId'] = {
                in: 'path',
                description: 'A MongoDB ObjectId',
                required: true
        } */
  try {
    let id: ObjectId;
    try {
      id = new ObjectId(req.params.authorId);
    } catch (err) {
      /* #swagger.responses[400] = {
            description: 'An invalid MongoDB ObjectId was provided.'
    } */
      res.status(400).json("Please provide a valid author id.");
      return;
    }
    const author = await db
      .getDb()
      .db("App2")
      .collection("authors")
      .find({ _id: id })
      .toArray() as Author;
    /* #swagger.responses[200] = {
            description: 'Returns a author object.',
            schema: { $ref: '#/definitions/Author' },
    } */
    res.status(200).json(author);
  } catch (err) {
    /* #swagger.responses[500] = {
            description: 'An error occured.'
    } */
    res.status(500).json(err);
  }
};

const createAuthor = async (req: Request, res: Response) => {
  // #swagger.summary = "This endpoint creates a author."
  /*  #swagger.parameters['newAuthor'] = {
                in: 'body',
                description: 'An object representing a new author',
                required: true,
                schema: {
                  $firstName: "John",
                  $lastName: "Doe",
                  $email: "john.doe@gmail.com"
                }
        } */
  try {
    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    })
    const collection = db.getDb().db("App2").collection("authors");
    const newAuthor = await collection.insertOne(author);
    /* #swagger.responses[201] = {
            description: 'Returns an object containing the result of the request and a string representing a MongoDB ObjectId.',
            schema: {
                    acknowledged: true,
                    insertedId: "643f75ca2cec8ebd2a3cc16c"
                }
    } */
    res.status(201).json(newAuthor);
  } catch (err) {
    /* #swagger.responses[500] = {
            description: 'An error occured.'
    } */
    res.status(500).json(err);
  }
}

const deleteAuthorById = async (req: Request, res: Response) => {
  // #swagger.summary = "This endpoint deletes a single author."
  /*  #swagger.parameters['authorId'] = {
                in: 'path',
                description: 'A MongoDB ObjectId',
                required: true
        } */
  try {
    let id: ObjectId;
    try {
      id = new ObjectId(req.params.authorId);
    } catch (err) {
      /* #swagger.responses[400] = {
            description: 'An invalid MongoDB ObjectId was provided.'
    } */
      res.status(400).json("Please provide a valid author id.");
      return;
    }
    await db.getDb().db("App2").collection("authors").deleteOne({ _id: id });
    /* #swagger.responses[200] = {
            description: 'The specified author has been deleted.',
    } */
    res.status(200).send();
  } catch (err) {
    /* #swagger.responses[500] = {
            description: 'An error occured.'
    } */
    res.status(500).json(err);
  }
};

const updateAuthorById = async (req: Request, res: Response) => {
  // #swagger.summary = "This endpoint updates the content of a single author."
  /*  #swagger.parameters['authorId'] = {
                in: 'path',
                description: 'A MongoDB ObjectId',
                required: true
        } */
  /*  #swagger.parameters['author'] = {
                in: 'body',
                description: 'An updated author object',
                schema: { $ref: '#/definitions/Author' },
                required: true
        } */
  try {
    let author = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }
    let id: ObjectId;
    try {
      id = new ObjectId(req.params.authorId);
    } catch (err) {
      /* #swagger.responses[400] = {
            description: 'An invalid MongoDB ObjectId was provided.'
    } */
      res.status(400).json("Please provide a valid author id.");
      return;
    }
    await db.getDb().db("App2").collection("authors").updateOne({ _id: id }, { $set: author });
    /* #swagger.responses[204] = {
                description: 'The specified author has been edited.',
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
  getAllAuthors,
  getAuthorById,
  createAuthor,
  deleteAuthorById,
  updateAuthorById
}