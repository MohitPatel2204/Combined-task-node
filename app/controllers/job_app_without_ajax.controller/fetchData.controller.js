const selectDataWithId = require("../../services/job_app_without_ajax/selectDataWithId");

const fetchData = (async(request, response)=>{
    let result = await selectDataWithId(request.params.id);
    response.send(result);
})

module.exports = fetchData;