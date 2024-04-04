const tic_tac_toe = ((request, response) => {
  try {
    response.render("javascript_ex/tic_tac_toe");
  }
  catch {
    response.render("error");
  }
})

module.exports = tic_tac_toe;