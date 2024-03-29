const isAuthentication = require("../middlewares/isAuthentication.middleware");

const menu = require("express").Router();

menu.get("/menu",isAuthentication,(request,response)=>{
    response.render("login/menu");
})

module.exports = menu;