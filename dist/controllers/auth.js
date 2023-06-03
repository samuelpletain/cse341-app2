"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login = (req, res) => {
    // #swagger.summary = "This endpoint redirects a user to /auth/google."
    res.redirect('/auth/google');
};
const logout = (req, res, next) => {
    // #swagger.summary = "This endpoint logs out a user."
    // @ts-ignore
    req.logout();
    res.redirect('/');
};
module.exports = {
    login,
    logout
};
