const dashboard = ((request, response) => {
  try{
    response.render("login/dashboard");
  }
  catch(error){
    response.render("error");
  }
})

module.exports = dashboard;