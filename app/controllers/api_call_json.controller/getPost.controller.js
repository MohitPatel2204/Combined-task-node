const getPost = ((request, response) => {
  try {
    response.render("api_call_json/post");
  } catch (error) {
    response.redirect("*");
  }
})

module.exports = getPost;