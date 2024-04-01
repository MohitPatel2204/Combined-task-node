const errorPage = require("./controllers/error.controller");
const clientEnvVariable = require("./controllers/clientEnvVariable.controller");
const javascript_ex_main = require("./controllers/javascript_ex.controller/javascript_ex_main");
const menu = require("./controllers/menu.controller");
const home = require("./controllers/home.controller");
const index = require("./controllers/index.controller");
const isAuthentication = require("./middlewares/isAuthentication.middleware");
const api_call_json_main = require("./controllers/api_call_json.controller/api_call_json_main");
const attendance_filter_main = require("./controllers/attendance_filter/attendance_filter_main");
const delimeter_filter_main = require("./controllers/delimeter_filter.js/delimeter_filter_main");
const dynamic_component_main = require("./controllers/dynamic_component.controller/dynamic_component_main");
const result_main = require("./controllers/result.controller/result_main");
const state_city_main = require("./controllers/state_city.controller/state_city_main");
const student_grid_pagination_main = require("./controllers/student_grid_pagination.controller.js/student_grid_pagination_main");
const timezone_convertor_main = require("./controllers/timezone_convertor.controller/timezone_convertor_main");
const login_main = require("./controllers/login.controller/login_main");
const userjson_main = require("./controllers/userjson.controller/userjson_main");
const job_app_ajax_main = require("./controllers/job_app_ajax.controller/job_app_ajax_main");
const job_app_without_ajax_main = require("./controllers/job_app_without_ajax.controller/job_app_without_ajax_main");
const html_ex_main = require("./controllers/html_ex.controller/html_ex_main");

const router = (app) => {
    app.use("/", login_main);
    app.use("/index", index);
    app.use("/clientEnvVariable", clientEnvVariable);
    app.use("/javascript_ex/", isAuthentication, javascript_ex_main);
    app.use("/json_app", isAuthentication, api_call_json_main);
    app.use("/attendance_filter", isAuthentication, attendance_filter_main);    
    app.use("/student", isAuthentication, delimeter_filter_main);
    app.use("/", isAuthentication, dynamic_component_main);
    app.use("/", isAuthentication, result_main);
    app.use("/", isAuthentication, state_city_main);
    app.use("/", student_grid_pagination_main);
    app.use("/", timezone_convertor_main);
    app.use("/userjson", isAuthentication,userjson_main)
    app.use("/job_app_ajax/", isAuthentication, job_app_ajax_main);
    app.use("/job_app_without_ajax/", isAuthentication, job_app_without_ajax_main);
    app.use("/", isAuthentication,html_ex_main)
    app.use("/home", isAuthentication, home);
    app.use("/menu", isAuthentication, menu);
    app.use("*", errorPage);
}

module.exports = router;