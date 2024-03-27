const isAuthentication = require("../../middlewares/isAuthentication.middleware");
const dashboard = require("express").Router();

dashboard.get("/dashboard", isAuthentication,(request, response)=>{
    response.render("login/dashboard");
})

module.exports = dashboard;