const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { isValidPost } = require("../../middlewares/isValid.middleware");
const database = require("../../services/database");

const loginUser = require("express").Router();

loginUser.get("/login", (request, response)=>{
    response.render("login/login");
})

loginUser.post("/login", isValidPost,async(request, response)=>{
    let username = request.body.username;
    let password = request.body.password;
    const db = new database(process.env.DB_DATABASE);

    let user = await db.executeQuery(`select * from users_detail where (email = '${username}' or phoneno = '${username}') and status = 1`);

    if(typeof user == 'string')
    {
        response.send({
            flag: false,
            msg: "Something is wrong, Please restart application...",
        })
        response.end();
    }
    
    if(user.length > 0)
    {
        let count = await db.executeQuery(`SELECT count(*) as 'no_of_user' FROM users_log where timestampdiff(MINUTE, log_time, current_timestamp())<${process.env.LOGIN_TRY_TIME_DIFF} and issuccess = 0 and user_id = ${user[0].id};`)
        count = count[0].no_of_user;
        if(count <= process.env.LOGIN_TRY)
        {
            user = user.pop();        
            password = md5(password + user.soalt);
            if(password == user.password)
            {
                let result = await db.insertData("users_log", {
                    user_id : user.id,
                    issuccess: 1,
                })
        
                if(typeof result == 'string')
                {
                    response.send({
                        flag: false,
                        msg: "Something is wrong, Restart application...." + result,
                    })
                }
                response.send({
                    flag: true,
                    token: jwt.sign({
                        email: user.email,
                        phoneno: user.phoneno,               
                    }, process.env.TOKEN_SCREAT_KEY),
                })
                response.end();
            }
            else
            {
                let result = await db.insertData("users_log", {
                    user_id : user.id,
                    issuccess: 0,
                })
        
                if(typeof result == 'string')
                {
                    response.send({
                        flag: false,
                        msg: "Something is wrong, Restart application...." + result,
                    })
                }
                response.send({
                    flag: false,
                    msg: "Username or password invalid....",
                })
                response.end();
            }
        }
        else
        {
            response.send({
                flag: false,
                login_expired: true,
                msg: `Your account is blocked in ${process.env.BLOCKED_ACCOUNT} seconds.....`,
            })
        }
    }
    else
    {
        response.send({
            flag: false,
            msg: "Username and password is invalid...."
        })
    }
})

module.exports = loginUser;