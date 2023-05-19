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
const posts_1 = __importDefault(require("../models/posts"));
const db = require("../db/connect");
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.summary = "This endpoint returns a list of all the contacts in the database."
    try {
        const posts = yield db.getDb().db("App2").collection("posts").find({}).toArray();
        /* #swagger.responses[200] = {
                description: 'Returns an array of contact objects.',
                schema: [{ $ref: '#/definitions/Contact' }]
        } */
        res.status(200).json(posts);
    }
    catch (err) {
        /* #swagger.responses[500] = {
                description: 'An error occured.'
        } */
        res.status(500).json(err);
    }
});
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = new posts_1.default({
            content: req.body.content,
            authorId: req.body.authorId,
            tags: req.body.tags,
            replyTo: req.body.replyTo
        });
        const collection = db.getDb().db("App2").collection("posts");
        const newContact = yield collection.insertOne(post);
        /* #swagger.responses[201] = {
                description: 'Returns an object containing the result of the request and a string representing a MongoDB ObjectId.',
                schema: {
                        acknowledged: true,
                        insertedId: "643f75ca2cec8ebd2a3cc16c"
                    }
        } */
        res.status(201).json(newContact);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
module.exports = {
    getAllPosts,
    createPost
};
