// const isAuthentication = require("../../middlewares/isAuthentication.middleware");

// const events = require("express").Router();

const events = ((request, response)=>{
    response.render("javascript_ex/events");
})

module.exports = events;