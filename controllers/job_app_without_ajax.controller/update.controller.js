const formValidate = require("../../middlewares/formValidate.middleware");
const isAuthentication = require("../../middlewares/isAuthentication.middleware");
const updateData = require("../../services/job_app_without_ajax/updateData");

const updateGet = (async(request, response)=>{
    response.render("job_app_without_ajax/form");
})

const updatePost = (async(request, response)=>{
    const data = request.body;
    let result = await updateData(data);
    if(result==true)
    {
        response.method="GET";
        response.redirect("/job_app_without_ajax/candidates");
    }
    else
    {
        response.method="GET";
        response.render("job_app_without_ajax/form", {error: result});
    }
})

module.exports = {
    updateGet,
    updatePost
};