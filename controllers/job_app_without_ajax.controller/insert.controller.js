const express = require("express");
const isAuthentication = require("../../middlewares/isAuthentication.middleware");
const insertData = require("../../services/job_app_without_ajax/insertData");
const formValidate = require("../../middlewares/formValidate.middleware");
const insert = express.Router();

insert.post("/job_app_without_ajax/insert", isAuthentication, formValidate, async(request, response)=>{
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

insert.get("/job_app_without_ajax/insert", (request, response)=>{
    response.render("job_app_without_ajax/form");
})

module.exports = insert;
