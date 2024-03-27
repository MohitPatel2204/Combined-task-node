const mysql = require("mysql");

class database{
    constructor(database){
        this.host = process.env.DB_HOST;
        this.user = process.env.DB_USER;
        this.password = process.env.DB_PASSWORD;
        this.database = database
    }

    getConnection = async() =>{
        let conn = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            dateStrings: true,
        });

        const connection = new Promise((resolve, reject)=>{
            conn.connect(error=>{
                if(error){
                    reject(error.sqlMessage);
                }
                else{
                    resolve(conn); 
                }
            })
        })

        return connection.then(result=>{
            return result;
        }).catch(error=>{
            return error;
        })
    }

    executeQuery = async(sql)=>{
        const conn = await this.getConnection();
        const query1 = new Promise((resolve,reject)=>{
            conn.query(sql, (error, result)=>{
                if(error)
                    reject(error.sqlMessage);
                else
                    resolve(result)
            })
        })

        return query1.then(result=>{
            return result;
        }).catch(error=>{
            return error;
        })
    }

    insertData = async(tablename, data) => {
        let sql = `insert into ${tablename}(`;

        Object.keys(data).forEach(key=>{
            sql += `${key},`;
        })
        
        sql = sql.slice(0, sql.length-1) + ") values (";
        
        Object.keys(data).forEach(key=>{
            sql += `'${data[key]}',`;
        })

        sql = sql.slice(0, sql.length-1) + ");";

        return await this.executeQuery(sql);
    }

    updateData = async(tablename, newdata, conditions)=>{
        let sql = `update ${tablename} set `;

        Object.keys(newdata).forEach(key=>{
            sql += `${key} = '${newdata[key]}', `
        })

        sql = sql.slice(0, sql.length-2) + " where ";
        
        Object.keys(conditions).forEach(key=>{
            sql += `${key} = '${conditions[key]}' and `
        })
        
        sql = sql.slice(0, sql.length-5) + ";";
        return await this.executeQuery(sql)
    }
    
    deleteData = async(tablename, conditions) => {
        let sql = `delete from ${tablename} where `;
        Object.keys(conditions).forEach(key=>{
            sql += `${key} = '${conditions[key]}' and `
        })
        
        sql = sql.slice(0, sql.length-5) + ";";
        return await this.executeQuery(sql)
    }
}

module.exports = database;