"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const connectionString = process.env.ATLAS_URI || "";
let _db;
const initDb = (callback) => {
    if (_db) {
        console.log("Db is already initialized!");
        return callback(null, _db);
    }
    mongoClient
        .connect(connectionString)
        .then((client) => {
        _db = client;
        callback(null, _db);
    })
        .catch((err) => {
        callback(err);
    });
};
const getDb = () => {
    if (!_db) {
        throw Error("Db not initialized");
    }
    return _db;
};
module.exports = {
    initDb,
    getDb
};
