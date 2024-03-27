const student = require("./student.controller");

const delimeter_filter_main = (app) =>{
    app.use(student);
}

module.exports = delimeter_filter_main;