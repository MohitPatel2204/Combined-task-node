const isAuthentication = require('../../middlewares/isAuthentication.middleware');

const state_city_form = require('express').Router();

state_city_form.get("/state_city", isAuthentication,(request, response)=>{
    response.render("state_city/state_city_form");
})

module.exports = state_city_form;