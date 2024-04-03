const express = require("express");
const isAuthentication = require("../../middlewares/isAuthentication.middleware");
const insertData = require("../../services/job_app_without_ajax/insertData");
const formValidate = require("../../middlewares/formValidate.middleware");
const insert = express.Router();

const insertPost = (async(request, response)=>{
    let data = request.body;
    let result = await insertData(data);
    if(result==true)
    {
        response.redirect("/job_app_without_ajax/candidates");
    }
    else
    {
        response.method="GET";
        response.render("job_app_without_ajax/form", {error: result});
    }
})

const insertGet = ((request, response)=>{
    response.render("job_app_without_ajax/form");
})

module.exports = {
    insertGet,
    insertPost,
};
