"use strict";
const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'Social Media API',
        description: 'The Social Media API is a RESTful API that allows users to interact with a social media platform. It provides endpoints for creating, retrieving, updating, and deleting posts and authors.'
    },
    host: 'cse341-app2.onrender.com',
    schemes: ['https'],
    definitions: {
        Post: {
            $content: 'This is a post!',
            $authorId: '6465a918462368509b563b23',
            tags: ['Technology', 'Innovation', 'Programming'],
            likes: 33,
            replyTo: '6465abf6462368509b563b2a',
            createdOn: '2022-09-25T09:12:45Z',
            editedAt: '2022-10-15T13:42:30Z'
        },
        Author: {
            $firstName: 'John',
            $lastName: 'Doe',
            $email: 'john.doe@gmail.com',
            joinedOn: '2022-10-15T13:42:30Z'
        }
    },
    securityDefinitions: {
        oAuthSample: {
            type: 'oauth2',
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
            tokenUrl: 'https://www.googleapis.com/oauth2/v4/token',
            flow: 'implicit',
            scopes: {
                'https://www.googleapis.com/auth/userinfo.profile': 'All user operations requiring authentication.'
            }
        }
    }
};
const outputFile = './dist/swagger-output.json';
const endpointsFiles = ['./routes/posts.ts', './routes/authors.ts', './routes/auth.ts'];
swaggerAutogen(outputFile, endpointsFiles, doc);
