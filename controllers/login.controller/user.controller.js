const database = require("../../services/database");
const { getCode } = require("../../services/date");
// const { isValidPost, isValidGet } = require("../../middlewares/isValid.middleware");
// const isAuthentication = require("../../middlewares/isAuthentication.middleware");

// const User = require("express").Router();

const userPost = (async (request, response) => {
    let user = request.body;
    let db = new database(process.env.DB_DATABASE);
    let result = await db.executeQuery(`select * from users_detail where email = '${user.email}' or phoneno = '${user.phoneno}'`);
    if (typeof result == 'string') {
        response.send({
            flag: false,
            msg: "Sorry, Something is wrong, Restart Application...",
        })
    }
    if (result.length == 0) {
        const activation_code = getCode(process.env.ACTIVATION_CODE_LENGTH);

        result = await db.insertData("users_detail", {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phoneno: user.phoneno,
            activation_code: activation_code,
        })

        if (typeof result == 'string') {
            response.send({
                flag: false,
                msg: "Sorry, Something is wrong, Restart Application..." + result,
            })
        }
        else {
            response.send({
                flag: true,
                msg: `http://${process.env.HOST}:${process.env.PORT}/password/${activation_code}`,
            })
        }
    }
    else {
        result = result[0];

        if (result.status == 1) {
            response.send({
                flag: false,
                msg: "Sorry, This user is alredy exist",
            })
        }
        else {
            const activation_code = getCode(process.env.ACTIVATION_CODE_LENGTH);
            result = await db.executeQuery(`update users_detail set activation_code = '${activation_code}', activate_time = CURRENT_TIMESTAMP where email = '${user.email}' and phoneno = '${user.phoneno}'`);
            if (typeof result == 'string') {
                response.send({
                    flag: false,
                    msg: "Somethig is wrong, Please restart application....",
                })
            }
            else {
                if(result.affectedRows == 1)
                {
                    response.send({
                        flag: true,
                        msg: `Account is not activate if activate then open<br>http://${process.env.HOST}:${process.env.PORT}/password/${activation_code}`,
                    })
                }
                else
                {
                    response.send({
                        flag: false,
                        msg: "Sorry, Email ID or Phone number is already exist...",
                    })
                }
            }
        }
    }
})


const userGet = (async (request, response) => {
    const db = new database(process.env.DB_DATABASE);

    let result = await db.executeQuery(`select * from users_detail where id = '${request.body.id}'`);
    if (typeof result == 'string') {
        response.send({
            flag: false,
            error: "Something is wrong..."
        })
    }
    else {
        response.send({
            flag: true,
            data: result
        })
    }
})

const usersGet = (async(request, response)=>{
    const db  = new database(process.env.DB_DATABASE);
    let sql = "select * from users_detail";
    const conditions = request.query;

    if(Object.keys(conditions).length != 0)
    {
        sql += " where ";
        Object.keys(conditions).forEach(key=>{
            sql += `${key} = '${conditions[key]}' and `;
        })
        sql = sql.slice(0, sql.length-5)
    }
    sql += ';'
    
    let result = await db.executeQuery(sql);

    if(typeof result == 'string')
    {
        response.send({
            flag: false,
            msg: "Error: Pramameter is invalid..."
        })
    }
    else
    {
        response.send({
            flag: true,
            data: result
        })
    }
})


module.exports = {
    userGet,
    userPost,
    usersGet,
};