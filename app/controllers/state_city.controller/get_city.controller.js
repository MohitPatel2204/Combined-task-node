const database = require('../../../services/database');

const getCity = (async(request, response)=>{
	try{
		let db = new database(process.env.DB_DATABASE);
		response.send({
			flag: true,
			data: await db.executeQuery("select * from cities;")}
		);
	}
	catch{
		response.send({
			error: "Something is wrong, restart your application....",
			flag: false,
		})
	}
})

const getCityWithID = (async(request, response)=>{
	try{
		let db = new database(process.env.DB_DATABASE);
		response.send({
			flag: true,
			data: await db.executeQuery(`select * from cities where state_id = ?;`, [request.params.state_id])
		})
	}
	catch{
		response.send({
			error: "Something is wrong, restart your application....",
			flag: false,
		})
	}
})

module.exports = {
	getCity,
	getCityWithID,
};