const database = require('../../services/database');

const getCity = (async(request, response)=>{
    let db = new database(process.env.DB_DATABASE);
    response.send(await db.executeQuery("select * from cities;"));
})

const getCityWithID = (async(request, response)=>{
    let db = new database(process.env.DB_DATABASE);
    response.send(await db.executeQuery(`select * from cities where state_id = '${request.params.state_id}';`))
})

module.exports = {
    getCity,
    getCityWithID,
};