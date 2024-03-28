const login_main = require("./controllers/login.controller/login_main");
const errorPage = require("./controllers/error.controller");
const clientEnvVariable = require("./controllers/clientEnvVariable.controller");
const javascript_ex_main = require("./controllers/javascript_ex.controller/javascript_ex_main");
const student_grid_pagination_main = require("./controllers/student_grid_pagination.controller.js/student_grid_pagination_main");
const userjson_main = require("./controllers/userjson.controller/userjson_main");
const api_call_json_main = require("./controllers/api_call_json.controller/api_call_json_main");
const dynamic_component_main = require("./controllers/dynamic_component.controller/dynamic_component_main");
const delimeter_filter_main = require("./controllers/delimeter_filter.js/delimeter_filter_main");
const attendance_filter_main = require("./controllers/attendance_filter/attendance_filter_main");
const timezone_convertor_main = require("./controllers/timezone_convertor.controller/timezone_convertor_main");
const result_main = require("./controllers/result.controller/result_main");
const state_city_main = require("./controllers/state_city.controller/state_city_main");
const job_app_without_ajax_main = require("./controllers/job_app_without_ajax.controller/job_app_without_ajax_main");
const job_app_ajax_main = require("./controllers/job_app_ajax.controller/job_app_ajax_main");

const router = (app) => {
    login_main(app);
    javascript_ex_main(app);
    student_grid_pagination_main(app);
    userjson_main(app);    
    api_call_json_main(app);
    dynamic_component_main(app);
    delimeter_filter_main(app);
    attendance_filter_main(app);
    timezone_convertor_main(app);
    result_main(app);
    state_city_main(app);
    job_app_without_ajax_main(app);
    job_app_ajax_main(app);
    app.use(clientEnvVariable);
    app.use(errorPage);
}

module.exports = router;