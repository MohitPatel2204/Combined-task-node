const allresult = require("./allresult.controller");
const result = require("./result.controller");

const result_main = require("express").Router();

result_main.get("/allresult", allresult);
result_main.get("/result/:id", result);

module.exports = result_main;