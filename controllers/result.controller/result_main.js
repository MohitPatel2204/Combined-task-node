const allresult = require("./allresult.controller");
const result = require("./result.controller");

const result_main = (app) => {
    app.use(allresult);
    app.use(result);
}

module.exports = result_main;