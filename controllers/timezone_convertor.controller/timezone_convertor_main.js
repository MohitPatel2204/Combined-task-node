const convertor = require("./convertor.controller");
const timezonesWithCities = require("./timezonesWithCities.controller");

const timezone_convertor_main = require("express").Router();

timezone_convertor_main.get("/time", timezonesWithCities);
timezone_convertor_main.get("/timezone_convertor", convertor);

module.exports = timezone_convertor_main;