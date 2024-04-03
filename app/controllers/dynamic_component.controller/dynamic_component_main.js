const dynamic_component = require("./dynamic_component.controller");

const dynamic_component_main = require("express").Router();

dynamic_component_main.get("/dynamic_component/", dynamic_component);

module.exports = dynamic_component_main;