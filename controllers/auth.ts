import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

const login = (req: Request, res: Response) => {
  res.redirect('/auth/google');
}

const logout = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  req.logout();
  res.redirect('/');
}

module.exports = {
  login,
  logout
}