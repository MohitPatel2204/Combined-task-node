const errorPage = require("express").Router();

errorPage.get("*", (request, response)=>{
    response.render("error");
})

module.exports = errorPage;