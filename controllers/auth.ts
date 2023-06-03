import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

const login = (req: Request, res: Response) => {
  // #swagger.summary = "This endpoint redirects a user to /auth/google."
  res.redirect('/auth/google');
}

const logout = (req: Request, res: Response, next: NextFunction) => {
  // #swagger.summary = "This endpoint logs out a user."
  // @ts-ignore
  req.logout();
  res.redirect('/');
}

module.exports = {
  login,
  logout
}