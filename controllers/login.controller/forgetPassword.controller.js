const database = require("../../services/database");
const { getCode } = require("../../services/date");

const forgetPasswordForm = ((request, response)=>{
    response.render("login/forgetpassword")
})

const forgetPassword = (async(request, response)=>{
    username = request.params.username;
    const db = new database(process.env.DB_DATABASE);
    
    let result  = await db.executeQuery(`select * from users_detail where (email = '${username}' or phoneno = '${username}') and status = '1'`)
    if(typeof result == 'string')
    {
        response.send({
            flag: false,
            msg: "Somethig is wrong, Please restart application...." + result,
        })
    }
    if(result.length == 0)
    {
        response.send({
            flag: false,
            msg: "Sorry, Account is not exist....",
        })
    }
    else
    {
        const activation_code = getCode(process.env.ACTIVATION_CODE_LENGTH);
        let curtime = new Date();

        result = await db.executeQuery(`update users_detail set activation_code = '${activation_code}', activate_time = CURRENT_TIMESTAMP where email = '${username}' or phoneno = '${username}'`);
        
        if(typeof result == 'string')
        {
            response.send({
                flag: false,
                msg: "Somethig is wrong, Please restart application....",
            })
        }
        else
        {
            response.send({
                flag: true,
                msg: `http://${process.env.HOST}:${process.env.PORT}/password/${activation_code}`,
            })
        }
    }
})

module.exports = {
    forgetPasswordForm,
    forgetPassword,
};