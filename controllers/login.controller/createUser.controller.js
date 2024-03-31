const md5 = require("md5");
const database = require("../../services/database");
const { getDifferenceSeconds, getCode } = require("../../services/date");
// const { isValidPost } = require("../../middlewares/isValid.middleware");
// const createUser = require("express").Router();
const registerForm = ((request, response) => {
    response.render("login/createUser")
})

const createPasswordGet = (async(request, response)=>{
    const activation_code = request.params.activationCode;

    if(activation_code != "")
    {
        const db = new database(process.env.DB_DATABASE);
        let result = await db.executeQuery(`select * from users_detail where activation_code = '${activation_code}';`);
        let diff = getDifferenceSeconds(new Date(), result[0].activate_time);
        if(diff > process.env.ACTIVATION_LINK_TIME)
        {
            let result = await db.executeQuery(`update user_details activation_code = NULL where activation_code = ${activation_code}`);
            if(typeof result == 'string')
                response.render("error", {msg: "ERROR : Somethig is wrong...."})
            response.render("error", {msg: "Activation link is expired\nPlease, Create account...."})
        }
        else
        {
            response.render("login/createPassword");
        }
    }
    else
    {
        response.render("login/createUser");
    }
})

const createPasswordPost = (async(request, response)=>{
    const db = new database(process.env.DB_DATABASE);
    const soalt = getCode(process.env.SOALT_LENGTH);
    const password = md5(`${request.body.password}${soalt}`);

    let result = await db.executeQuery(`update users_detail set password = '${password}', soalt='${soalt}', status='1', activation_code = NULL where activation_code = '${request.params.activationCode}'`);


    if(typeof result == 'string')
    {
        response.render("login/createPassword", {
            error:"Sorry, Somethig is wrong Re-create password",
        })
    }
    else
    {
        response.redirect("/login/");
    }
})

module.exports = {
    registerForm, 
    createPasswordGet,
    createPasswordPost
}