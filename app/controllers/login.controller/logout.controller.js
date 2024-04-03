const logout = ((request, response) => {
  try{
    response.clearCookie("token")
    delete request.body.id;
    response.redirect("/login/");
  }
  catch{
    response.render("error");
  }
})

module.exports = logout;