const getPost = require("../app/controllers/api_call_json.controller/getPost.controller");
const getPosts = require("../app/controllers/api_call_json.controller/getposts.controller");
const attendance = require("../app/controllers/attendance_filter/attendance.controller");
const getAttendanceOperation = require("../app/controllers/attendance_filter/getAttendanceOperation.contoller");
const clientEnvVariable = require("../app/controllers/clientEnvVariable.controller");
const student = require("../app/controllers/delimeter_filter.js/student.controller");
const dynamic_component = require("../app/controllers/dynamic_component.controller/dynamic_component.controller");
const errorPage = require("../app/controllers/error.controller");
const home = require("../app/controllers/home.controller");
const index = require("../app/controllers/index.controller");
const cubegame = require("../app/controllers/javascript_ex.controller/cubegame.controller");
const dynamicTable = require("../app/controllers/javascript_ex.controller/dynamicTable.controller");
const events = require("../app/controllers/javascript_ex.controller/events.controller");
const tic_tac_toe = require("../app/controllers/javascript_ex.controller/tic_tac_toe.controller");
const { registerForm, createPasswordGet, createPasswordPost } = require("../app/controllers/login.controller/createUser.controller");
const dashboard = require("../app/controllers/login.controller/dashboard.controller");
const { forgetPasswordForm, forgetPassword } = require("../app/controllers/login.controller/forgetPassword.controller");
const { loginUserGet, loginUserPost } = require("../app/controllers/login.controller/loginUser.controller");
const logout = require("../app/controllers/login.controller/logout.controller");
const { userGet, userPost, usersGet } = require("../app/controllers/login.controller/user.controller");
const menu = require("../app/controllers/menu.controller");
const allresult = require("../app/controllers/result.controller/allresult.controller");
const result = require("../app/controllers/result.controller/result.controller");
const isAuthentication = require("../middlewares/isAuthentication.middleware");
const { isValidPost, isValidGet } = require("../middlewares/isValid.middleware");

const routers = require("express").Router();
/* ========================================================
login module routers
=========================================================== */
routers.get("/createUser", registerForm);
routers.get("/password/:activationCode",createPasswordGet);
routers.post("/password/:activationCode", isValidPost, createPasswordPost)
routers.get("/forgetpassword", forgetPasswordForm)
routers.get("/forgetpassword/:username", forgetPassword)
routers.get("/login/", loginUserGet)
routers.post("/login/", loginUserPost)
routers.get("/user", isAuthentication,isValidPost, userGet)
routers.post("/user", isAuthentication, userPost)
routers.get("/users", isValidGet, usersGet)
routers.get("/logout", logout);
routers.get("/dashboard", dashboard);
routers.get("/index", index);
routers.get("/clientEnvVariable", clientEnvVariable);
routers.get("/home", isAuthentication, home);
routers.get("/menu", isAuthentication, menu);

/* ========================================================
javascript ex. example routers
=========================================================== */
routers.get("/javascript_ex/cubegame", isAuthentication, cubegame);
routers.get("/javascript_ex/dynamictable", isAuthentication, dynamicTable);
routers.get("/javascript_ex/events", isAuthentication, events);
routers.get("/javascript_ex/tic_tac_toe", isAuthentication, tic_tac_toe);

/* ========================================================
json placeholder api call
=========================================================== */
routers.get("/json_app/post/:id", getPost);
routers.get("/json_app/posts", getPosts);


/* ========================================================
attendance fileter in month, year module router
=========================================================== */
routers.get("/attendance_filter/attendance/:operation", isAuthentication, getAttendanceOperation);
routers.get("/attendance_filter/attendance/", isAuthentication,attendance);


/* ========================================================
delimeter module router
=========================================================== */
routers.get("/student/delimeter", student)

/* ========================================================
dynamic component module router
=========================================================== */
routers.get("/dynamic_component/", dynamic_component);

/* ========================================================
student exam result module routers
=========================================================== */
routers.get("/allresult", allresult);
routers.get("/result/:id", result);

/* ========================================================
state city selection module routers
=========================================================== */


/* ========================================================
error page routers
=========================================================== */
routers.get("*", errorPage);

module.exports = routers;

// app.use("/", login_main);
// app.use("/index", index);
// app.use("/clientEnvVariable", clientEnvVariable);
// app.use("/javascript_ex/", isAuthentication, javascript_ex_main);
// app.use("/json_app", isAuthentication, api_call_json_main);
// app.use("/attendance_filter", isAuthentication, attendance_filter_main);    
// app.use("/student", isAuthentication, delimeter_filter_main);
// app.use("/", isAuthentication, dynamic_component_main);
// app.use("/", isAuthentication, result_main);
//     app.use("/", isAuthentication, state_city_main);
//     app.use("/", student_grid_pagination_main);
//     app.use("/", timezone_convertor_main);
//     app.use("/userjson", isAuthentication,userjson_main)
//     app.use("/job_app_ajax/", isAuthentication, job_app_ajax_main);
//     app.use("/job_app_without_ajax/", isAuthentication, job_app_without_ajax_main);
//     app.use("/", isAuthentication, html_ex_main)
//     app.use("/home", isAuthentication, home);
//     app.use("/menu", isAuthentication, menu);
//     app.use("*", errorPage);