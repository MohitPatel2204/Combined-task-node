const logout = ((request, response) => {
    response.clearCookie("token")
    delete request.body.id;
    response.redirect("/login/");
})

module.exports = logout;