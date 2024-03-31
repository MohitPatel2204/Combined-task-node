const isAuthentication = require('../../middlewares/isAuthentication.middleware');
const database = require('../../services/database');

const getState = (async(request, response)=>{
    let db = new database(process.env.DB_DATABASE);
    response.send(await db.executeQuery("select * from states;"));
})

module.exports = getState;