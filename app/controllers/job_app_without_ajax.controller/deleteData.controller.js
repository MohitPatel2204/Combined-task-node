const deleteDataWithID = require("../../../services/job_app_without_ajax/deleteDataWithId");

const deleteData = (async (request, response) => {
  try {
    const candidate_id = request.params.id;
    let result = await deleteDataWithID(candidate_id);
    response.redirect("/job_app_without_ajax/candidates/");
  }
  catch {
    response.redirect("*");
  }
})

module.exports = deleteData;