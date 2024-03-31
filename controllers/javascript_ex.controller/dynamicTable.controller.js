// const isAuthentication = require("../../middlewares/isAuthentication.middleware");

// const dynamicTable = require("express").Router();

const dynamicTable = ((request, response)=>{
    response.render("javascript_ex/dynamictable")
});

module.exports = dynamicTable;