const isAuthentication = require("../../middlewares/isAuthentication.middleware");
const deleteDataWithID = require("../../services/job_app_without_ajax/deleteDataWithId");

const deleteData = require("express").Router();

deleteData.get("/job_app_without_ajax/delete/:id", isAuthentication,async (request, response)=>{
    const candidate_id = request.params.id;
    let result = await deleteDataWithID(candidate_id);
    response.render("job_app_without_ajax/view");
})

module.exports = deleteData;