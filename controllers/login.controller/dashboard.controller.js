const jwt = require("jsonwebtoken");
const dashboard = require("express").Router();

dashboard.get("/dashboard/:token", (request, response)=>{
    let data = jwt.verify(request.params.token, process.env.TOKEN_SCREAT_KEY)
    response.render("login/dashboard", data);
})

module.exports = dashboard;