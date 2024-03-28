const deleteData = require("./deleteData.controller");
const fetchData = require("./fetchData.controller");
const insert = require("./insert.controller");
const update = require("./update.controller");
const viewAllCandidates = require("./viewAllCandidates.controller");

const job_app_without_ajax_main = (app) => {
    app.use(insert);
    app.use(deleteData);
    app.use(fetchData);
    app.use(update);
    app.use(viewAllCandidates);
}

module.exports = job_app_without_ajax_main;