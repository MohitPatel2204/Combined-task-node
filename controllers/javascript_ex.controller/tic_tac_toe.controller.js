const isAuthentication = require("../../middlewares/isAuthentication.middleware");
const tic_tac_toe = require("express").Router();

tic_tac_toe.get("/tic_tac_toe", isAuthentication, (request, response)=>{
    response.render("javascript_ex/tic_tac_toe");
})

module.exports = tic_tac_toe;