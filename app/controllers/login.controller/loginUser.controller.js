const md5 = require("md5");
const jwt = require("jsonwebtoken");
const database = require("../../../services/database");

const loginUserGet = ((request, response) => {
  try {
    if (request.cookies.token != undefined) {
      let data = jwt.verify(request.cookies.token, process.env.TOKEN_SCREAT_KEY)
      const id = data.id;
      if (id == undefined || id == "" || id == null || id <= 0) {
        response.render("/login/login");
        return;
      }
      response.redirect("/home");
      return;
    }
    response.render("login/login");
  }
  catch (error) {
    response.render("error");
  }
})

const loginUserPost = (async (request, response) => {
  let username = request.body.username;
  let password = request.body.password;
  const db = new database(process.env.DB_DATABASE);
  try {
    let user = await db.executeQuery(`select * from users_detail where (email = ? or phoneno = ?) and status = 1`, [username, username]);

    if (typeof user == 'string') {
      response.send({
        flag: false,
        msg: "Something is wrong, Please restart application...",
      })
      response.end();
    }

    if (user.length > 0) {
      let count = await db.executeQuery(`SELECT count(*) as 'no_of_user' FROM users_log where timestampdiff(MINUTE, log_time, current_timestamp())<? and issuccess = 0 and user_id = ?;`, [process.env.LOGIN_TRY_TIME_DIFF, user[0].id])
      count = count[0].no_of_user;
      if (count <= process.env.LOGIN_TRY) {
        user = user.pop();
        password = md5(password + user.soalt);
        if (password == user.password) {
          let result = await db.insertData("users_log", {
            user_id: user.id,
            issuccess: 1,
          })

          if (typeof result == 'string') {
            response.send({
              flag: false,
              msg: "Something is wrong, Restart application...." + result,
            })
          }
          const token = jwt.sign({
            id: user.id,
          }, process.env.TOKEN_SCREAT_KEY)
          response.cookie("token", token, { maxAge: process.env.LOGIN_TIME * 60 * 60 * 1000 })
          response.send({
            flag: true,
            token: token,
          })
          response.end();
        }
        else {
          let result = await db.insertData("users_log", {
            user_id: user.id,
            issuccess: 0,
          })

          if (typeof result == 'string') {
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
      else {
        response.send({
          flag: false,
          login_expired: true,
          msg: `Your account is blocked in ${process.env.BLOCKED_ACCOUNT} seconds.....`,
        })
      }
    }
    else {
      response.send({
        flag: false,
        msg: "Username and password is invalid...."
      })
    }
  }
  catch {
    response.send({
      flag: false,
      msg: "Something is wrong, Please restart application...",
    })
  }
})

module.exports = {
  loginUserGet,
  loginUserPost,
};