const student = require("./student.controller");

const student_grid_pagination_main = (app) =>{
    app.use(student);
}

module.exports = student_grid_pagination_main;