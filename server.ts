import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

const express = require('express');

const posts = require("./routes/posts");
const authors = require("./routes/authors");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use('/', posts);
app.use('/', authors)

mongoose.connect(process.env.ATLAS_URI).then(() => {
  console.log(`Successfully connected to MongoDB`);
  app.listen(port, () => {
    console.log(`Server running on ${process.env.RENDER_EXTERNAL_URL}:${port}`);
  });
}).catch((err: Error) => {
  console.log(`Not connected to MongoDB`);
});