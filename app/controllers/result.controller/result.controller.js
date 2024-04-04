const getStudentResult = require("../../../services/result.services/getStudentResult");

const result = (async (request, response) => {
  try {
    let userresult = await getStudentResult(request.params.id);
    response.render("result/displayrecord", { result: userresult });
  }
  catch {
    response.render("error")
  }
})

module.exports = result;