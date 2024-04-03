const formValidate = require("../../middlewares/formValidate.middleware");
const deleteData = require("./deleteData.controller");
const fetchData = require("./fetchData.controller");
const { insertGet, insertPost } = require("./insert.controller");
const { updateGet, updatePost } = require("./update.controller");
const viewAllCandidates = require("./viewAllCandidates.controller");

const job_app_without_ajax_main = require("express").Router();

job_app_without_ajax_main.get("/delete/:id", deleteData);

job_app_without_ajax_main.get("/fetch/:id", fetchData);

job_app_without_ajax_main.get("/insert", insertGet);
job_app_without_ajax_main.post("/insert", formValidate,insertPost)

job_app_without_ajax_main.get("/update/:id", updateGet);
job_app_without_ajax_main.post("/update/:id", formValidate, updatePost);

job_app_without_ajax_main.get("/candidates/", viewAllCandidates);

module.exports = job_app_without_ajax_main;