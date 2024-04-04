const database = require("../../../services/database");

const grid_filter=(async(request, response)=>{
    let db = new database(process.env.DB_DATABASE);
    try{
        let databases = await db.executeQuery("show databases;");
        let options = {};
        databases.forEach(database=>{
            options[database['Database']] = database['Database'];
        })

        databaseName = {
            options,
            name: "db",
            tabindex : 0
        }
        
        if(request.query.query)
        {
            db = new database(request.query.db);
            const result = await db.executeQuery(request.query.query);
            let table = {
                name: "table1",
                data: result,
                displayRecord: 10
            }
            databaseName['selected'] = request.query.db;
            response.render("grid_filter/index", {table, query : request.query.query, databaseName});    
        }
        else
        {
            response.render("grid_filter/index", {query : null, databaseName});
        }
    }
    catch(e){
        response.render("error");
    }
})

module.exports = grid_filter;