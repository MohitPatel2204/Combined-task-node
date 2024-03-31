// const isAuthentication = require("../../middlewares/isAuthentication.middleware");
// const tic_tac_toe = require("express").Router();

const tic_tac_toe = ((request, response)=>{
    response.render("javascript_ex/tic_tac_toe");
})

module.exports = tic_tac_toe;