"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = require("graphql-http/lib/use/express");
const posts_1 = __importDefault(require("./schema/posts"));
const express = require('express');
const db = require("./db/connect");
const posts = require("./routes/posts");
dotenv_1.default.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/', posts);
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src https://localhost:3000");
    next();
});
app.all("/graphql", (0, express_1.createHandler)({
    schema: posts_1.default
}));
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
