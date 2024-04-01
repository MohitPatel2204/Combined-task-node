// const createUser = require("./createUser.controller");
// const dashboard = require("./dashboard.controller");
// const forgetPassword = require("./forgetPassword.controller");
// const loginUser = require("./loginUser.controller");
// const logout = require("./logout.controller");
// const User = require("./user.controller");

const dashboard = require("./dashboard.controller");
const {registerForm, createPasswordGet, createPasswordPost} = require("./createUser.controller");
const { forgetPasswordForm, forgetPassword } = require("./forgetPassword.controller");
const { isValidPost, isValidGet } = require("../../middlewares/isValid.middleware");
const { loginUserGet, loginUserPost } = require("./loginUser.controller");
const logout = require("./logout.controller");
const isAuthentication = require("../../middlewares/isAuthentication.middleware");
const { userGet, userPost, usersGet } = require("./user.controller");

const login_main = require("express").Router();

login_main.get("/createUser", registerForm);

login_main.get("/password/:activationCode",createPasswordGet);
login_main.post("/password/:activationCode", isValidPost, createPasswordPost)

login_main.get("/forgetpassword", forgetPasswordForm)
login_main.get("/forgetpassword/:username", forgetPassword)

login_main.get("/login/", loginUserGet)
login_main.post("/login/", loginUserPost)

login_main.get("/user", isAuthentication,isValidPost, userGet)
login_main.post("/user", isAuthentication, userPost)
login_main.get("/users", isValidGet, usersGet)

login_main.get("/logout", logout);

login_main.get("/dashboard", dashboard);

module.exports = login_main;