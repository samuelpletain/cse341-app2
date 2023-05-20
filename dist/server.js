"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express = require('express');
const db = require("./db/connect");
const posts = require("./routes/posts");
const authors = require("./routes/authors");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
dotenv_1.default.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use('/', posts);
app.use('/', authors);
db.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
});
