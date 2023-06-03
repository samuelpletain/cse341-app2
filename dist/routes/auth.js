"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const passportStategies = require('../config/passport');
const routes = require('express').Router();
routes.get('/login', (req, res) => {
    res.redirect('/auth/google');
});
routes.get('/logout', (req, res, next) => {
    // @ts-ignore
    req.logout();
    res.redirect('/');
});
routes.get('/google', passport.authenticate('google', {
    scope: ['profile'],
}));
routes.get('/google/redirect', passport.authenticate('google', {
    successRedirect: '/posts',
    failureRedirect: '/auth/login',
}));
module.exports = routes;
