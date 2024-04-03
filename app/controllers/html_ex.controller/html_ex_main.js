const { task1, task2, task3 } = require("./tasks.controller");

const html_ex_main = require("express").Router();

html_ex_main.get("/task1", task1);
html_ex_main.get("/task2", task2);
html_ex_main.get("/task3", task3);

module.exports = html_ex_main;