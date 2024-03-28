const isAuthentication = require("../../middlewares/isAuthentication.middleware");
const getStudentResult = require("../../services/result.services/getStudentResult");

const result = require("express").Router();

result.get("/result/:id", isAuthentication,async(request, response)=>{
    let userresult = await getStudentResult(request.params.id);
    response.render("result/displayrecord" , {result: userresult});
})

module.exports = result;