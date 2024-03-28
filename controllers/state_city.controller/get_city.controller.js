const isAuthentication = require('../../middlewares/isAuthentication.middleware');
const database = require('../../services/database');

const getCity = require('express').Router();

getCity.get("/city", isAuthentication,async(request, response)=>{
    let db = new database(process.env.DB_DATABASE);
    response.send(await db.executeQuery("select * from cities;"));
})

getCity.get("/city/:state_id", isAuthentication,async(request, response)=>{
    let db = new database(process.env.DB_DATABASE);
    response.send(await db.executeQuery(`select * from cities where state_id = '${request.params.state_id}';`))
})

module.exports = getCity;