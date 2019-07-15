import { Router } from "express";

import { getClient } from "./db";

const { check, validationResult, oneOf } = require("express-validator");
const { Helper } = require("./helper.js");
const helper = new Helper();

const api = new Router();

api.get("/singleterm", function(request, response) {
  const client = getClient();

  client.connect(function() {
    const db = client.db("glossary");
    const collection = db.collection("definitions");

    const searchObject = {};

    if (request.query.term) {
      searchObject.term_slug = request.query.term;
    }

    if (request.query.topic) {
      searchObject.topic_slug = request.query.topic;
    }

    console.log(searchObject);

    collection.findOne(searchObject, function(error, def) {
      response.send(error || def);
      client.close();
    });
  });
});

api.post("/addterm", helper.isValidQuery(), function(request, response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({
      errors: errors.array()
    });
  }

  const client = getClient();

  const query = Object.keys(request.body);
  const searchObject = helper.generateSearchObject(query, request);
  if (helper.isObjectEmpty(searchObject)) {
    return response.status(400).json(`Error: Invalid criteria`);
  }

  client.connect(function() {
    const db = client.db("glossary");
    const collection = db.collection("definitions");
    collection.findOne(searchObject, function(error, definition) {
      if (definition) {
        return response
          .status(400)
          .json(`Error: ${definition.term} is already defined`);
      } else if (error) {
        return response.status(400).json(error);
      } else {
        collection.insertOne(searchObject, function(error, result) {
          response.status(200).send(error || result.ops[0]);
          client.close();
        });
      }
    });
  });
});

api.get("/", (_, res, next) => {
  const client = getClient();

  client.connect(err => {
    if (err) {
      return next(err);
    }
    collection.findOne(searchObject, function(error, def) {
      response.send(error || def);
      client.close();
    });
  });
});

api.get("/getAll", (_, res, next) => {
  const client = getClient();

  client.connect(err => {
    const db = client.db("glossary");
    const collection = db.collection("definitions");

    if (err) {
      return next(err);
    }
    collection.find({}).toArray(function(error, def) {
      res.send(error || def);

      client.close();
    });
  });
});

api.post("/post", (req, res) => {
  const client = getClient();

  client.connect(err => {
    if (err) {
      return next(err);
    }

    //Create the functions
    client.close();
  });
});

export default api;
