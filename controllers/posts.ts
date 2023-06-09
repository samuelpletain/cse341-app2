import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Post from '../models/posts';

const getAllPosts = async (req: Request, res: Response) => {
  // #swagger.summary = "This endpoint returns a list of all the posts in the database."
  try {
    const posts = await Post.find() as Post[];
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
      res.status(400).json('Please provide a valid post id.');
      return;
    }
    const post = await Post.findOne(id) as Post;
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
  /* #swagger.security = [{
            "oAuthSample": [
                "https://www.googleapis.com/auth/userinfo.profile",
            ]
        }] */
  // #swagger.summary = "This endpoint creates a post."
  /*  #swagger.parameters['newPost'] = {
                in: 'body',
                description: 'An object representing a new post',
                required: true,
                schema: {
                  $content: 'Jhon Doe',
                  $authorId: '6465a918462368509b563b23',
                  tags: ["Technology", "Innovation", "Programming"],
                  replyTo: "6465abf6462368509b563b30"
                }
        } */
  try {
    const post = new Post({
      content: req.body.content,
      authorId: req.body.authorId
    });
    if (req.body.tags) {
      Object.assign(post, { tags: req.body.tags });
    }
    if (req.body.replyTo) {
      Object.assign(post, { replyTo: req.body.replyTo });
    }
    const newPost = await post.save().catch((err: Error) => {
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
  } catch (err) {
    /* #swagger.responses[500] = {
            description: 'An error occured.'
    } */
    res.status(500).json(err);
  }
};

const deletePostById = async (req: Request, res: Response) => {
  /* #swagger.security = [{
            "oAuthSample": [
                "https://www.googleapis.com/auth/userinfo.profile",
            ]
        }] */
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
      res.status(400).json('Please provide a valid post id.');
      return;
    }
    await Post.deleteOne(id);
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
  /* #swagger.security = [{
            "oAuthSample": [
                "https://www.googleapis.com/auth/userinfo.profile",
            ]
        }] */
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
    const post = {
      content: req.body.content,
      authorId: req.body.authorId
    };
    if (req.body.tags) {
      Object.assign(post, { tags: req.body.tags });
    }
    if (req.body.likes) {
      Object.assign(post, { likes: req.body.likes });
    }
    if (req.body.replyTo) {
      Object.assign(post, { replyTo: req.body.replyTo });
    }
    if (req.body.createdOn) {
      Object.assign(post, { createdOn: req.body.createdOn });
    }
    if (req.body.editedAt) {
      Object.assign(post, { editedAt: req.body.editedAt });
    }
    let id: ObjectId;
    try {
      id = new ObjectId(req.params.postId);
    } catch (err) {
      /* #swagger.responses[400] = {
            description: 'An invalid MongoDB ObjectId was provided.'
    } */
      res.status(400).json('Please provide a valid post id.');
      return;
    }
    await Post.replaceOne({ _id: id }, post, { runValidators: true }).catch((err: Error) => {
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
};
