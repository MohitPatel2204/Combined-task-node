const convertor = require("./convertor.controller");
const timezonesWithCities = require("./timezonesWithCities.controller");

const timezone_convertor_main = (app) => {
    app.use(convertor);
    app.use(timezonesWithCities);
}

module.exports = timezone_convertor_main;