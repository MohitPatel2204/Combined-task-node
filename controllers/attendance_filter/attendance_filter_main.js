const attendance = require("./attendance.controller");

const attendance_filter_main = (app) => {
    app.use(attendance);
}

module.exports = attendance_filter_main;