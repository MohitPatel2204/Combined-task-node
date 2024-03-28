const candidate = require("./candidate.controller")
const deleteCandidate = require("./delete.controller")
const insert = require("./insert.controller")
const update = require("./update.controller")
const viewAllCandidates = require("./viewAllCandidates.controller")

const job_app_ajax_main = (app) => {
    app.use(candidate)
    app.use(deleteCandidate)
    app.use(insert)
    app.use(update)
    app.use(viewAllCandidates)
}

module.exports = job_app_ajax_main;