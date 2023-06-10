import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Author from '../models/authors';

const getAllAuthors = async (req: Request, res: Response) => {
  // #swagger.summary = "This endpoint returns a list of all the authors in the database."
  try {
    const authors = await Author.find() as Author[];
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
      res.status(400).json('Please provide a valid author id.');
      return;
    }
    const author = await Author.findOne(id) as Author;
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
  /* #swagger.security = [{
            "oAuthSample": [
                "https://www.googleapis.com/auth/userinfo.profile",
            ]
        }] */
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
    const authorObj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };
    if (req.body.joinedOn) {
      Object.assign(authorObj, { joinedOn: req.body.joinedOn });
    }
    const author = new Author(authorObj);
    const newAuthor = await author.save().catch((err: Error) => {
      /* #swagger.responses[422] = {
            description: 'The provided author object does not pass validation.'
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
    res.status(201).json(newAuthor);
  } catch (err) {
    /* #swagger.responses[500] = {
            description: 'An error occured.'
    } */
    res.status(500).json(err);
  }
};

const deleteAuthorById = async (req: Request, res: Response) => {
  /* #swagger.security = [{
            "oAuthSample": [
                "https://www.googleapis.com/auth/userinfo.profile",
            ]
        }] */
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
      res.status(400).json('Please provide a valid author id.');
      return;
    }
    await Author.deleteOne(id);
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
  /* #swagger.security = [{
            "oAuthSample": [
                "https://www.googleapis.com/auth/userinfo.profile",
            ]
        }] */
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
    const author = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };
    if (req.body.joinedOn) {
      Object.assign(author, { joinedOn: req.body.joinedOn });
    }
    let id: ObjectId;
    try {
      id = new ObjectId(req.params.authorId);
    } catch (err) {
      /* #swagger.responses[400] = {
            description: 'An invalid MongoDB ObjectId was provided.'
    } */
      res.status(400).json('Please provide a valid author id.');
      return;
    }
    await Author.replaceOne({ _id: id }, author, { runValidators: true }).catch((err: Error) => {
      /* #swagger.responses[422] = {
            description: 'The provided author object does not pass validation.'
    } */
      res.status(422).json({
        error: err.message
      });
    });
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
};
