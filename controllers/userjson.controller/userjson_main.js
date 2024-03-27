const userjson = require("./userjson.controller");

const userjson_main = (app) => {
    app.use(userjson);
}

module.exports = userjson_main;