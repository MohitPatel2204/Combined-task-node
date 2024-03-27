const jwt = require("jsonwebtoken");

const isAuthentication = (request, response, next) => {
    const token = request.cookies.token;
    if(token == undefined || token == "" || token == null)
    {
        console.log("cookie not avilable")
        response.redirect("/login");
    }

    let data = jwt.verify(request.cookies.token, process.env.TOKEN_SCREAT_KEY)
    const id = data.id
    if(id == undefined || id == "" || id == null || id <= 0)
    {
        console.log("id not avilable")
        response.redirect("/login");
    }
    request.body.id = id
    next();
}
module.exports = isAuthentication;