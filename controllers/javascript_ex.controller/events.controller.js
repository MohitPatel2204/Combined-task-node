const isAuthentication = require("../../middlewares/isAuthentication.middleware");

const events = require("express").Router();

events.get("/events", isAuthentication, (request, response)=>{
    response.render("javascript_ex/events");
})

module.exports = events;