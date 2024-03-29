const isAuthentication = require("../middlewares/isAuthentication.middleware");

const home = require("express").Router();

home.get("/home",isAuthentication,(request,response)=>{
    response.render("login/home");
})

module.exports = home;