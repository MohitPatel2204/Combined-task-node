const login_main = require("./controllers/login.controller/login_main");
const errorPage = require("./controllers/error.controller");
const clientEnvVariable = require("./controllers/clientEnvVariable.controller");

const router = (app) => {
    login_main(app);
    app.use(clientEnvVariable)
    app.use(errorPage);
}

module.exports = router;