const isAuthentication = require("../../middlewares/isAuthentication.middleware");

const convertor = require("express").Router();

convertor.get("/timezone_convertor", isAuthentication,(reuest, response)=>{
    response.render("timezone_convertor");
})

module.exports = convertor;