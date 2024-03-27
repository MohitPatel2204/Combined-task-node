const isAuthentication = require("../../middlewares/isAuthentication.middleware");

const dynamicTable = require("express").Router();

dynamicTable.get("/dynamictable",isAuthentication, (request, response)=>{
    response.render("javascript_ex/dynamictable")
})