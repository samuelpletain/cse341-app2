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
const posts_1 = __importDefault(require("../models/posts"));
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.summary = "This endpoint returns a list of all the posts in the database."
    try {
        const posts = yield posts_1.default.find();
        /* #swagger.responses[200] = {
                description: 'Returns an array of post objects.',
                schema: [{ $ref: '#/definitions/Post' }]
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
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.summary = "This endpoint returns the details of a single post."
    /*  #swagger.parameters['postId'] = {
                  in: 'path',
                  description: 'A MongoDB ObjectId',
                  required: true
          } */
    try {
        let id;
        try {
            id = new mongodb_1.ObjectId(req.params.postId);
        }
        catch (err) {
            /* #swagger.responses[400] = {
                  description: 'An invalid MongoDB ObjectId was provided.'
          } */
            res.status(400).json("Please provide a valid post id.");
            return;
        }
        const post = yield posts_1.default.findOne(id);
        /* #swagger.responses[200] = {
                description: 'Returns a post object.',
                schema: { $ref: '#/definitions/Post' },
        } */
        res.status(200).json(post);
    }
    catch (err) {
        /* #swagger.responses[500] = {
                description: 'An error occured.'
        } */
        res.status(500).json(err);
    }
});
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const post = new posts_1.default({
            content: req.body.content,
            authorId: req.body.authorId,
            tags: req.body.tags,
            replyTo: req.body.replyTo,
            editedAt: req.body.editedAt
        });
        const newPost = yield post.save().catch((err) => {
            /* #swagger.responses[422] = {
                  description: 'The provided post object does not pass validation.'
          } */
            res.status(422).json({
                error: err.message
            });
        });
        /* #swagger.responses[201] = {
                description: 'Returns an object containing the result of the request and a string representing a MongoDB ObjectId.',
                schema: {
                        acknowledged: true,
                        insertedId: "643f75ca2cec8ebd2a3cc16c"
                    }
        } */
        res.status(201).json(newPost);
    }
    catch (err) {
        /* #swagger.responses[500] = {
                description: 'An error occured.'
        } */
        res.status(500).json(err);
    }
});
const deletePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.summary = "This endpoint deletes a single post."
    /*  #swagger.parameters['postId'] = {
                  in: 'path',
                  description: 'A MongoDB ObjectId',
                  required: true
          } */
    try {
        let id;
        try {
            id = new mongodb_1.ObjectId(req.params.postId);
        }
        catch (err) {
            /* #swagger.responses[400] = {
                  description: 'An invalid MongoDB ObjectId was provided.'
          } */
            res.status(400).json("Please provide a valid post id.");
            return;
        }
        yield posts_1.default.deleteOne(id);
        /* #swagger.responses[200] = {
                description: 'The specified post has been deleted.',
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
const updatePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        };
        let id;
        try {
            id = new mongodb_1.ObjectId(req.params.postId);
        }
        catch (err) {
            /* #swagger.responses[400] = {
                  description: 'An invalid MongoDB ObjectId was provided.'
          } */
            res.status(400).json("Please provide a valid post id.");
            return;
        }
        yield posts_1.default.replaceOne({ _id: id }, post, { runValidators: true }).catch((err) => {
            /* #swagger.responses[422] = {
                  description: 'The provided post object does not pass validation.'
          } */
            res.status(422).json({
                error: err.message
            });
        });
        /* #swagger.responses[204] = {
                    description: 'The specified post has been edited.',
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
    getAllPosts,
    getPostById,
    createPost,
    deletePostById,
    updatePostById
};
