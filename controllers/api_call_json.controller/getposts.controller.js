const express = require("express");
const isAuthentication = require("../../middlewares/isAuthentication.middleware");
const getPosts = express.Router();

getPosts.get("/posts/", isAuthentication,(request, response)=>{
    response.render("api_call_json/posts");
})

module.exports = getPosts;