const convertor = require("express").Router();

convertor.get("/timezone_convertor", (reuest, response)=>{
    response.render("timezone_convertor");
})

module.exports = convertor;