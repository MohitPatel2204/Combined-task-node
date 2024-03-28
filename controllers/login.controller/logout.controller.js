const isAuthentication = require("../../middlewares/isAuthentication.middleware");

const logout = require("express").Router();

logout.get("/logout", isAuthentication,(request, response) => {
    response.clearCookie("token")
    delete request.body.id;
    response.redirect("/login/");
})

module.exports = logout;