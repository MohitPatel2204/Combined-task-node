const isAuthentication = require("../../middlewares/isAuthentication.middleware");

const cubegame = require("express").Router();

cubegame.get("/cubegame", isAuthentication,(request, response)=>{
    response.render("javascript_ex/cube_game");
})

module.exports = cubegame;