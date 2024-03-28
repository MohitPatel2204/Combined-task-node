const jwt = require("jsonwebtoken");

const isAuthentication = (request, response, next) => {
    const token = request.cookies.token;
    if(token == undefined || token == "" || token == null)
    {
        response.redirect("/login");
        return;
    }

    let data = jwt.verify(request.cookies.token, process.env.TOKEN_SCREAT_KEY)
    const id = data.id
    if(id == undefined || id == "" || id == null || id <= 0)
    {
        console.log("id not avilable")
        response.redirect("/login");
        return;
    }
    request.body.id = id
    next();
}
module.exports = isAuthentication;