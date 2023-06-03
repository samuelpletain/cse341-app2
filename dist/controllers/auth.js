"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login = (req, res) => {
    res.redirect('/auth/google');
};
const logout = (req, res, next) => {
    // @ts-ignore
    req.logout();
    res.redirect('/');
};
module.exports = {
    login,
    logout
};
