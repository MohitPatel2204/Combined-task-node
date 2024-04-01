const { userjson, userjsonDisplay, userAddGet, userAddPost } = require("./userjson.controller");

const userjson_main = require("express").Router();

userjson_main.get("/",userjson);
userjson_main.get("/display",userjsonDisplay);
userjson_main.get("/add", userAddGet);
userjson_main.post("/add", userAddPost);

module.exports = userjson_main;