"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express = require("express");
const posts = require('./routes/posts');
const authors = require('./routes/authors');
const auth = require('./routes/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
dotenv_1.default.config();
const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.get('/', (req, res) => {
    res.render('home');
});
app.use('/', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', posts);
app.use('/', authors);
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});
mongoose.connect(process.env.ATLAS_URI).then(() => {
    console.log('Successfully connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server running on ${process.env.RENDER_EXTERNAL_URL}:${port}`);
        console.log(`Documentation: ${process.env.RENDER_EXTERNAL_URL}:${port}/api-docs`);
    });
}).catch((err) => {
    console.log(err);
    console.log('Not connected to MongoDB');
});
