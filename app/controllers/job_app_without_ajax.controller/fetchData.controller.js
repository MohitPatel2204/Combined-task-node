const selectDataWithId = require("../../../services/job_app_without_ajax/selectDataWithId");

const fetchData = (async(request, response)=>{
    try{
        let result = await selectDataWithId(request.params.id);
        response.send({
            result:result,
            flag: true,
        });
    }
    catch{
        response.send({
            flag: false,
            msg:"Something is wrong",
        })
    }
})

module.exports = fetchData;