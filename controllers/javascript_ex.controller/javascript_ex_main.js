const cubegame = require("./cubegame.controller");
const dynamicTable = require("./dynamicTable.controller");
const events = require("./events.controller");
const tic_tac_toe = require("./tic_tac_toe.controller");

const javascript_ex_main = (app) => {
    app.use(cubegame);
    app.use(dynamicTable);
    app.use(events);
    app.use(tic_tac_toe)
}

module.exports = javascript_ex_main;