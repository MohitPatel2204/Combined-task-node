const index = require("express").Router();

index.get("/index",(request,response)=>{
    response.render("index");
})

module.exports = index;