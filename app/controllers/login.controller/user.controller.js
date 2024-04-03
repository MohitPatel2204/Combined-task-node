const database = require("../../../services/database");
const { getCode } = require("../../../services/date");

const userPost = (async (request, response) => {
  let user = request.body;
  let db = new database(process.env.DB_DATABASE);
  try {
    let result = await db.executeQuery(`select * from users_detail where email = ? or phoneno = ?`, [user.email, user.phoneno]);
    if (typeof result == 'string') {
      response.send({
        flag: false,
        msg: "Sorry, Something is wrong, Restart Application...",
      })
    }
    if (result.length == 0) {
      const activationCode = getCode(process.env.ACTIVATION_CODE_LENGTH);

      result = await db.insertData("users_detail", {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phoneno: user.phoneno,
        activation_code: activationCode,
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
          msg: `http://${process.env.HOST}:${process.env.PORT}/password/${activationCode}`,
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
        const activationCode = getCode(process.env.ACTIVATION_CODE_LENGTH);
        result = await db.executeQuery(`update users_detail set activation_code = ?, activate_time = CURRENT_TIMESTAMP where email = ? and phoneno = ?`, [activationCode, user.email, user.phoneno]);
        if (typeof result == 'string') {
          response.send({
            flag: false,
            msg: "Somethig is wrong, Please restart application....",
          })
        }
        else {
          if (result.affectedRows == 1) {
            response.send({
              flag: true,
              msg: `Account is not activate if activate then open<br>http://${process.env.HOST}:${process.env.PORT}/password/${activationCode}`,
            })
          }
          else {
            response.send({
              flag: false,
              msg: "Sorry, Email ID or Phone number is already exist...",
            })
          }
        }
      }
    }
  }
  catch {
    response.send({
      flag: false,
      msg: "Sorry, Something is wrong, Restart Application...",
    })
  }
})


const userGet = (async (request, response) => {
  const db = new database(process.env.DB_DATABASE);
  try {
    let result = await db.executeQuery(`select * from users_detail where id = ?`, [request.body.id]);
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
  }
  catch {
    response.send({
      flag: false,
      error: "Something is wrong, Restart Application..."
    })
  }
})

const usersGet = (async (request, response) => {
  const db = new database(process.env.DB_DATABASE);
  let sql = "select * from users_detail";
  const conditions = request.query;

  if (Object.keys(conditions).length != 0) {
    sql += " where ";
    Object.keys(conditions).forEach(key => {
      sql += `${key} = '${conditions[key]}' and `;
    })
    sql = sql.slice(0, sql.length - 5)
  }
  sql += ';'

  try{
    let result = await db.executeQuery(sql);

  if (typeof result == 'string') {
    response.send({
      flag: false,
      msg: "Error: Pramameter is invalid..."
    })
  }
  else {
    response.send({
      flag: true,
      data: result
    })
  }
  }
  catch{
    response.send({
      flag: false,
      msg: "Error: Somethig is wrong, Restart your application....",
    })
  }
})


module.exports = {
  userGet,
  userPost,
  usersGet,
};