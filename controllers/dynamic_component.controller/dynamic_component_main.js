const dynamic_component = require("./dynamic_component.controller");

const dynamic_component_main = (app) =>{
    app.use(dynamic_component);
}
module.exports = dynamic_component_main;