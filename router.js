const login_main = require("./controllers/login.controller/login_main");
const errorPage = require("./controllers/error.controller");
const clientEnvVariable = require("./controllers/clientEnvVariable.controller");
const javascript_ex_main = require("./controllers/javascript_ex.controller/javascript_ex_main");
const student_grid_pagination_main = require("./controllers/student_grid_pagination.controller.js/student_grid_pagination_main");

const router = (app) => {
    login_main(app);
    javascript_ex_main(app);
    student_grid_pagination_main(app);
    app.use(clientEnvVariable)
    app.use(errorPage);
}

module.exports = router;