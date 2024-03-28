const createUser = require("./createUser.controller");
const dashboard = require("./dashboard.controller");
const forgetPassword = require("./forgetPassword.controller");
const loginUser = require("./loginUser.controller");
const logout = require("./logout.controller");
const User = require("./user.controller");

const login_main = (app) => {
    app.use(createUser);
    app.use(dashboard);
    app.use(User);
    app.use(loginUser);
    app.use(forgetPassword);
    app.use(logout);
}

module.exports = login_main;