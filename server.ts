import dotenv from 'dotenv';

const express = require('express');
const db = require("./db/connect");

const posts = require("./routes/posts");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', posts);

db.initDb((err: Error) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});