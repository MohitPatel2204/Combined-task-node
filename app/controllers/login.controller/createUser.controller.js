const md5 = require("md5");
const { getDifferenceSeconds, getCode } = require("../../../services/date");
const database = require("../../../services/database");

const registerForm = ((request, response) => {
  try{
    response.render("login/createUser")
  }
  catch(error){
    response.render("error");
  }
})

const createPasswordGet = (async (request, response) => {
  const activationCode = request.params.activationCode;
  try{
    if (activationCode != "") {
      const db = new database(process.env.DB_DATABASE);
      let result = await db.executeQuery(`select * from users_detail where activation_code = ?;`, [activationCode]);
      let diff = getDifferenceSeconds(new Date(), result[0].activate_time);
      if (diff > process.env.ACTIVATION_LINK_TIME) {
        let result = await db.executeQuery(`update user_details activation_code = NULL where activation_code = ?`, [activationCode]);
        if (typeof result == 'string')
          response.render("error", { msg: "ERROR : Somethig is wrong...." })
        response.render("error", { msg: "Activation link is expired\nPlease, Create account...." })
      }
      else {
        response.render("login/createPassword");
      }
    }
    else {
      response.render("login/createUser");
    }
  }
  catch(error){
    response.render("error");
  }
})

const createPasswordPost = (async (request, response) => {
  const db = new database(process.env.DB_DATABASE);
  const soalt = getCode(process.env.SOALT_LENGTH);
  const password = md5(`${request.body.password}${soalt}`);

  let values = [password, soalt, request.params.activationCode];
  try {
    let result = await db.executeQuery(`update users_detail set password = ?, soalt=?, status='1', activation_code = NULL where activation_code = ?`, values);

    if (typeof result == 'string') {
      response.render("login/createPassword", {
        error: "Sorry, Somethig is wrong Re-create password",
      })
    }
    else {
      response.redirect("/login/");
    }
  }
  catch (error) {
    response.render("error");
  }
})

module.exports = {
  registerForm,
  createPasswordGet,
  createPasswordPost
}