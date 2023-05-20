"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const authors_1 = __importDefault(require("../models/authors"));
const db = require("../db/connect");
const getAllAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.summary = "This endpoint returns a list of all the authors in the database."
    try {
        const authors = yield db.getDb().db("App2").collection("authors").find({}).toArray();
        /* #swagger.responses[200] = {
                description: 'Returns an array of author objects.',
                schema: [{ $ref: '#/definitions/Author' }]
        } */
        res.status(200).json(authors);
    }
    catch (err) {
        /* #swagger.responses[500] = {
                description: 'An error occured.'
        } */
        res.status(500).json(err);
    }
});
const getAuthorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.summary = "This endpoint returns the details of a single author."
    /*  #swagger.parameters['authorId'] = {
                  in: 'path',
                  description: 'A MongoDB ObjectId',
                  required: true
          } */
    try {
        let id;
        try {
            id = new mongodb_1.ObjectId(req.params.authorId);
        }
        catch (err) {
            /* #swagger.responses[400] = {
                  description: 'An invalid MongoDB ObjectId was provided.'
          } */
            res.status(400).json("Please provide a valid author id.");
            return;
        }
        const author = yield db
            .getDb()
            .db("App2")
            .collection("authors")
            .find({ _id: id })
            .toArray();
        /* #swagger.responses[200] = {
                description: 'Returns a author object.',
                schema: { $ref: '#/definitions/Author' },
        } */
        res.status(200).json(author);
    }
    catch (err) {
        /* #swagger.responses[500] = {
                description: 'An error occured.'
        } */
        res.status(500).json(err);
    }
});
const createAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.summary = "This endpoint creates a author."
    try {
        const author = new authors_1.default({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        });
        const collection = db.getDb().db("App2").collection("authors");
        const newAuthor = yield collection.insertOne(author);
        /* #swagger.responses[201] = {
                description: 'Returns an object containing the result of the request and a string representing a MongoDB ObjectId.',
                schema: {
                        acknowledged: true,
                        insertedId: "643f75ca2cec8ebd2a3cc16c"
                    }
        } */
        res.status(201).json(newAuthor);
    }
    catch (err) {
        /* #swagger.responses[500] = {
                description: 'An error occured.'
        } */
        res.status(500).json(err);
    }
});
const deleteAuthorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.summary = "This endpoint deletes a single author."
    /*  #swagger.parameters['authorId'] = {
                  in: 'path',
                  description: 'A MongoDB ObjectId',
                  required: true
          } */
    try {
        let id;
        try {
            id = new mongodb_1.ObjectId(req.params.authorId);
        }
        catch (err) {
            /* #swagger.responses[400] = {
                  description: 'An invalid MongoDB ObjectId was provided.'
          } */
            res.status(400).json("Please provide a valid author id.");
            return;
        }
        yield db.getDb().db("App2").collection("authors").deleteOne({ _id: id });
        /* #swagger.responses[200] = {
                description: 'The specified author has been deleted.',
        } */
        res.status(200).send();
    }
    catch (err) {
        /* #swagger.responses[500] = {
                description: 'An error occured.'
        } */
        res.status(500).json(err);
    }
});
const updateAuthorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        };
        let id;
        try {
            id = new mongodb_1.ObjectId(req.params.authorId);
        }
        catch (err) {
            /* #swagger.responses[400] = {
                  description: 'An invalid MongoDB ObjectId was provided.'
          } */
            res.status(400).json("Please provide a valid author id.");
            return;
        }
        yield db.getDb().db("App2").collection("authors").updateOne({ _id: id }, { $set: author });
        /* #swagger.responses[204] = {
                    description: 'The specified author has been edited.',
            } */
        res.status(204).send();
    }
    catch (err) {
        /* #swagger.responses[500] = {
                description: 'An error occured.'
        } */
        res.status(500).json(err);
    }
});
module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    deleteAuthorById,
    updateAuthorById
};
