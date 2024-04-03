const database = require("../../../services/database");
const { getCode } = require("../../../services/date");

const forgetPasswordForm = ((request, response) => {
  try {
    response.render("login/forgetpassword")
  }
  catch (error) {
    response.redirect("*");
  }
})

const forgetPassword = (async (request, response) => {
  username = request.params.username;
  const db = new database(process.env.DB_DATABASE);
  try {
    let result = await db.executeQuery(`select * from users_detail where (email = ? or phoneno = ?) and status = '1'`, [username, username])
    if (typeof result == 'string') {
      response.send({
        flag: false,
        msg: "Somethig is wrong, Please restart application...." + result,
      })
    }
    if (result.length == 0) {
      response.send({
        flag: false,
        msg: "Sorry, Account is not exist....",
      })
    }
    else {
      const activationCode = getCode(process.env.ACTIVATION_CODE_LENGTH);
      let curtime = new Date();

      result = await db.executeQuery(`update users_detail set activation_code = ?, activate_time = CURRENT_TIMESTAMP where email = ? or phoneno = ?`, [activationCode, username, username]);

      if (typeof result == 'string') {
        response.send({
          flag: false,
          msg: "Somethig is wrong, Please restart application....",
        })
      }
      else {
        response.send({
          flag: true,
          msg: `http://${process.env.HOST}:${process.env.PORT}/password/${activationCode}`,
        })
      }
    }
  }
  catch (error) {
    response.send({
      flag: false,
      msg: 'ERROR : Somethig is wrong....',
    })
  }
})

module.exports = {
  forgetPasswordForm,
  forgetPassword,
};