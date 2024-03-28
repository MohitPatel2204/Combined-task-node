const isAuthentication = require("../../middlewares/isAuthentication.middleware");
const selectDataWithId = require("../../services/job_app_without_ajax/selectDataWithId");

const fetchData = require("express").Router();

fetchData.get("/job_app_without_ajax/fetch/:id", isAuthentication,async(request, response)=>{
    let result = await selectDataWithId(request.params.id);
    response.send(result);
})

module.exports = fetchData;