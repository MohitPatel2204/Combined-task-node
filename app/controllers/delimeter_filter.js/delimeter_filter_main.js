const student = require("./student.controller");
const delimeter_filter_main = require("express").Router();

delimeter_filter_main.get("/delimeter", student)

module.exports = delimeter_filter_main;