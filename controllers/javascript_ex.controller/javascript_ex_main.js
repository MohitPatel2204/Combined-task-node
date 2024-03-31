const isAuthentication = require("../../middlewares/isAuthentication.middleware");
const cubegame = require("./cubegame.controller");
const dynamicTable = require("./dynamicTable.controller");
const events = require("./events.controller");
const tic_tac_toe = require("./tic_tac_toe.controller");

const javascript_ex_main = require("express").Router();

javascript_ex_main.get("/cubegame", cubegame);
javascript_ex_main.get("/dynamictable", dynamicTable);
javascript_ex_main.get("/events", events);
javascript_ex_main.get("/tic_tac_toe", tic_tac_toe);

module.exports = javascript_ex_main;