const isAuthentication = require("../../middlewares/isAuthentication.middleware");

const getPost = require("express").Router();

getPost.get("/post/:id", isAuthentication,(request, response)=>{
    try {
        response.render("api_call_json/post");
    } catch (error) {
        response.render("error")
    }
})

module.exports = getPost;