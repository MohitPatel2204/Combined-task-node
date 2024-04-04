const database = require("../database");

const deleteDataWithID = async(id) => {
	let db = new database(process.env.DB_DATABASE);
	try{
		let result = await db.executeQuery(`select count(*) as 'isCandidate' from candidates_master where candidate_id = ${id}`);
		if(result[0].isCandidate>0)
		{
			result = await db.deleteData("work_experiences", {candidate_id: id})
			if(typeof result == 'string')
				return false;
			
			result = await db.deleteData("technologies", {candidate_id: id})
			if(typeof result == 'string')
				return false;
			
			result = await db.deleteData("`references`", {candidate_id: id})
			if(typeof result == 'string')
				return false;
			
			result = await db.deleteData("preferances", {candidate_id: id})
			if(typeof result == 'string')
				return `false ${result}`;
			
			result = await db.deleteData("languages", {candidate_id: id})
			if(typeof result == 'string')
				return `false ${result}`;
	
			result = await db.deleteData("educations", {candidate_id: id})
			if(typeof result == 'string')
				return false;
			
			result = await db.deleteData("candidates_master", {candidate_id: id})
			if(typeof result == 'string')
				return false;
	
			return true;
		}
		return false;
	}
	catch{
		throw error;
	}
}

module.exports = deleteDataWithID;