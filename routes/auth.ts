import { NextFunction, Router } from 'express'
import { Request, Response } from "express";
const passport = require('passport');
const passportStategies = require('../config/passport')
const auth = require('../controllers/auth')

const routes: Router = require('express').Router()

routes.get('/login', auth.login)

routes.get('/logout', auth.logout)

routes.get('/google', passport.authenticate('google', {
  scope: ['profile'],
}))

routes.get('/google/redirect', passport.authenticate('google', {
  successRedirect: '/posts',
  failureRedirect: '/auth/login',
}))

module.exports = routes;