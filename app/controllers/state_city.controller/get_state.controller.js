const database = require('../../../services/database');

const getState = (async (request, response) => {
  try {
    let db = new database(process.env.DB_DATABASE);
    response.send({
      flag: true,
      data: await db.executeQuery(`select * from states;`, [])
    })
  }
  catch {
    response.send({
      error: "Something is wrong, restart your application....",
      flag: false,
    })
  }
})

module.exports = getState;