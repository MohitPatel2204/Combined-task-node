const isAuthentication = require("../../middlewares/isAuthentication.middleware");
const dashboard = ((request, response)=>{
    response.render("login/dashboard");
})

module.exports = dashboard;