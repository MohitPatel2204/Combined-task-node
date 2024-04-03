const validation = require("../../middlewares/validation.middleware");
const candidateAPI = require("./candidate.controller");
const deleteCandidate = require("./delete.controller");
const { candidateAddGet, candidateAddPost } = require("./insert.controller");
const { candidateUpdateGet, candidateUpdatePost } = require("./update.controller");
const viewAllCandidates = require("./viewAllCandidates.controller");

const job_app_ajax_main = require("express").Router();

job_app_ajax_main.get("/candidate/:id", candidateAPI);

job_app_ajax_main.get('/delete/:id', deleteCandidate);

job_app_ajax_main.get("/insert_candidate", candidateAddGet)
job_app_ajax_main.post("/insert_candidate", validation,candidateAddPost);

job_app_ajax_main.get("/update_candidate/:id", candidateUpdateGet);
job_app_ajax_main.post("/update_candidate/:id", validation,candidateUpdatePost);

job_app_ajax_main.get("/candidates", viewAllCandidates);

module.exports = job_app_ajax_main;