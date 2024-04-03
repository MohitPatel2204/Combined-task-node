const getStudentResult = require("../../services/result.services/getStudentResult");

const result = (async(request, response)=>{
    let userresult = await getStudentResult(request.params.id);
    response.render("result/displayrecord" , {result: userresult});
})

module.exports = result;