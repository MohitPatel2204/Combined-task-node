const deleteDataWithID = require("../../services/job_app_without_ajax/deleteDataWithId");

const deleteData = (async (request, response)=>{
    const candidate_id = request.params.id;
    let result = await deleteDataWithID(candidate_id);
    response.render("job_app_without_ajax/view");
})

module.exports = deleteData;