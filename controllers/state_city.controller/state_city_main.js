const getCity = require("./get_city.controller");
const getState = require("./get_state.controller");
const state_city_form = require("./state_city_form.controller");

const state_city_main = (app) => {
    app.use(state_city_form);
    app.use(getState);
    app.use(getCity);
}

module.exports = state_city_main;