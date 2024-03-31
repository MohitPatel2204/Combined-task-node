const getPost = require("./getPost.controller");
const getPosts = require("./getposts.controller");
const api_call_json_main = require("express").Router();

api_call_json_main.get("/post/:id", getPost)
api_call_json_main.get("/posts", getPosts)

module.exports = api_call_json_main;