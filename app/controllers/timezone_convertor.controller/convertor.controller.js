const convertor = ((reuest, response) => {
  try {
    response.render("timezone_convertor");
  }
  catch {
    response.render("error")
  }
})

module.exports = convertor;