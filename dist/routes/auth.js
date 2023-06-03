"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const passportStategies = require('../config/passport');
const auth = require('../controllers/auth');
const routes = require('express').Router();
routes.get('/auth/login', auth.login);
routes.get('/auth/logout', auth.logout);
routes.get('/auth/google', passport.authenticate('google', {
    scope: ['profile'],
})
// #swagger.summary = "This endpoint handles OAuth authentication with Google."  
);
routes.get('/auth/google/redirect', passport.authenticate('google', {
    successRedirect: '/posts',
    failureRedirect: '/auth/login',
})
// #swagger.summary = "This endpoint handles the redirection following OAuth authentication with Google."
);
module.exports = routes;
