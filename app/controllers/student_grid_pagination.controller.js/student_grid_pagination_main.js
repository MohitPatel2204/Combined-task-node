const { students, studentOPeration } = require("./student.controller");

const student_grid_pagination_main =require("express").Router();

student_grid_pagination_main.get("/student", students);
student_grid_pagination_main.get("/student/:operation/:key/:order", studentOPeration);

module.exports = student_grid_pagination_main;