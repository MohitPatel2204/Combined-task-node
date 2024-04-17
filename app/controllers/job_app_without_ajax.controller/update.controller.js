const updateData = require("../../../services/job_app_without_ajax/updateData");

const updateGet = (async (request, response) => {
  response.render("job_app_without_ajax/form");
})

const updatePost = (async (request, response) => {
  const data = request.body;
  try {
    let result = await updateData(data);
    if (result == true) {
      response.method = "GET";
      response.redirect("/job_app_without_ajax/candidates");
    }
    else {
      response.method = "GET";
      response.render("job_app_without_ajax/form", { error: result });
    }
  }
  catch(error) {
    response.render("job_app_without_ajax/form", { error: "Server side error, Data is not updated...." + error });
  }
})

module.exports = {
  updateGet,
  updatePost
};