const getPost = require("./getPost.controller");
const getPosts = require("./getposts.controller");

const api_call_json_main = (app) => {
    app.use(getPosts);
    app.use(getPost);
}

module.exports = api_call_json_main;