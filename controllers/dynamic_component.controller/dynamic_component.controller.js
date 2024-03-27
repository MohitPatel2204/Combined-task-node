const express = require("express");
const database = require("../../services/database");
const dynamic_component = express.Router();

const getInput = async(componentName) => {
    const db = new database(process.env.DB_DATABASE);
    
    let component = await db.executeQuery(`select * from selects_master where select_key = '${componentName}'`);
    if(typeof(component) == "string" || Object.keys(component).length == 0)
    {
        return null;
    }
    else
    {
        component = component[0];
        component["options"] = await db.executeQuery(`select * from options_master where select_key = '${componentName}'`);
        return component;
    }
}

dynamic_component.get("/dynamic_component", async(request, response)=>{
    if(request.query.componentName)
    {
        let result = await getInput(request.query.componentName);
        if(result == null)
            response.send("Component not found")
        else
            response.render("dynamic_component/dynamic_component", {component: result, error: "", componentName: request.query.componentName});
    }
    else
    {
        response.render("dynamic_component/dynamic_component", {componentName: ""});
    }

})

module.exports = dynamic_component;