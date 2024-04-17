const mysql = require("mysql");

class database{
	constructor(database){
		this.host = process.env.DB_HOST;
		this.user = process.env.DB_USER;
		this.password = process.env.DB_PASSWORD;
		this.database = database;
	}
	
	getConnection = async() =>{
		let conn = mysql.createConnection({
			host: this.host,
			user: this.user,
			password: this.password,
			database: this.database,
			dateStrings: true,
		});

		return await new Promise((resolve, reject)=>{
			try {
				conn.connect(error=>{
					if(error){
						reject(error.sqlMessage);
					}
					else{
						resolve(conn); 
					}
				})
			}
			catch(error){
				throw error;
			}
		})  
	}

	executeQuery = async(sql, values)=>{
		const conn = await this.getConnection();
		return await new Promise((resolve,reject)=>{
			try{
				conn.query(sql, values, (error, result)=>{
					if(error) {
						reject(error.sqlMessage);
					}
					else
						resolve(result);
				});
			}
			catch(error){
				throw error;
			}
		})
	}

	insertData = async(tablename, data) => {
		let values = [];
		let sql = `insert into ${tablename}(`;
		Object.keys(data).forEach(key=>{
			sql += `${key},`;
		})
		sql = sql.slice(0, sql.length-1) + ") values (";
		Object.keys(data).forEach(key=>{
			sql += `?,`;
			values.push(data[key]);
		})
		sql = sql.slice(0, sql.length-1) + ");";
		try{
			return await this.executeQuery(sql, values);
		}
		catch(error){
			throw error;
		}
	}

	updateData = async(tablename, newdata, conditions)=>{
		let values = [];
		let sql = `update ${tablename} set `;

		Object.keys(newdata).forEach(key=>{
			sql += `${key} = ?, `
			values.push(newdata[key]);
		})
		sql = sql.slice(0, sql.length-2) + " where ";
		
		Object.keys(conditions).forEach(key=>{
			sql += `${key} = ? and `;
			values.push(conditions[key]);
		})
		
		sql = sql.slice(0, sql.length-5) + ";";
		try{
			return await this.executeQuery(sql, values)
		}
		catch(error){
			throw error;
		}
	}
	
	deleteData = async(tablename, conditions) => {
		let values = [];
		let sql = `delete from ${tablename} where `;
		Object.keys(conditions).forEach(key=>{
			sql += `${key} = ? and `;
			values.push(conditions[key]);
		})
		
		sql = sql.slice(0, sql.length-5) + ";";
		try{
			return await this.executeQuery(sql, values)
		}
		catch(error){
			throw error;
		}
	}
}

module.exports = database;