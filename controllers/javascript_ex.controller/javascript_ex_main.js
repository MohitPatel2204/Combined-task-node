const cubegame = require("./cubegame.controller");
const dynamicTable = require("./dynamicTable.controller");
const events = require("./events.controller");

const javascript_ex_main = (app) => {
    app.use(cubegame);
    app.use(dynamicTable);
    app.use(events)
}

module.exports = javascript_ex_main;