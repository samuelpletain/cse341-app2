import * as mongoDB from "mongodb";

const mongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const connectionString = process.env.ATLAS_URI || "";

let _db: mongoDB.MongoClient;

const initDb = (callback: Function) => {
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db);
  }
  mongoClient
    .connect(connectionString)
    .then((client: mongoDB.MongoClient) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err: mongoDB.MongoError) => {
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
