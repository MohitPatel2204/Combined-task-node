const attendance = require("./attendance.controller");
const getAttendanceOperation = require("./getAttendanceOperation.contoller");

const attendance_filter_main = require("express").Router();

attendance_filter_main.get("/attendance/:operation", getAttendanceOperation)
attendance_filter_main.get("/attendance/", attendance)


module.exports = attendance_filter_main;