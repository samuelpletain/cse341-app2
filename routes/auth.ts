import { NextFunction, Router } from 'express'
import { Request, Response } from "express";
const passport = require('passport');
const passportStategies = require('../config/passport')

const routes: Router = require('express').Router()

routes.get('/login', (req: Request, res: Response) => {
  res.redirect('/auth/google');
})

routes.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  req.logout();
  res.redirect('/');
})

routes.get('/google', passport.authenticate('google', {
  scope: ['profile'],
}))

routes.get('/google/redirect', passport.authenticate('google', {
  successRedirect: '/posts',
  failureRedirect: '/auth/login',
}))

module.exports = routes;