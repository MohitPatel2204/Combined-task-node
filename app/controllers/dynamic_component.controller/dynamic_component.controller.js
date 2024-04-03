const database = require("../../../services/database");

const getInput = async(componentName) => {
    try{
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
    catch(error){
        throw error;
    }
}

const dynamic_component = (async(request, response)=>{
    if(request.query.componentName)
    {
        try{
            let result = await getInput(request.query.componentName);
            if(result == null)
                response.render("dynamic_component/dynamic_component", {componentName: ""})
            else
                response.render("dynamic_component/dynamic_component", {component: result, error: "", componentName: request.query.componentName});
        }
        catch{
            response.render("error")
        }
    }
    else
    {
        response.render("dynamic_component/dynamic_component", {componentName: ""});
    }

})

module.exports = dynamic_component;