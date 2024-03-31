const { getCity, getCityWithID } = require("./get_city.controller");
const getState = require("./get_state.controller");
const state_city_form = require("./state_city_form.controller");

const state_city_main = require("express").Router();

state_city_main.get("/city", getCity);
state_city_main.get("/city/:state_id", getCityWithID);
state_city_main.get("/state", getState);
state_city_main.get("/state_city", state_city_form);


module.exports = state_city_main;