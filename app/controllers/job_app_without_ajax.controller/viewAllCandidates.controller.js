const database = require("../../../services/database");

const viewAllCandidates = (async (request, response) => {
  try {

    let db = new database(process.env.DB_DATABASE);
    let result = await db.executeQuery("SELECT candidate_id,first_name, last_name, designation, email, phoneno, gender FROM candidates_master;");
    let table = {
      name: "table1",
      data: result,
      displayRecord: 5,
      headerClass: 'bg-success',
      buttonClass: 'btn btn-success m-auto',
      inputClass: 'form-control border-1 border-success',
      tableClass: 'table',
      header: {
        candidate_id: "Candidate ID",
        first_name: "First name",
        last_name: "Last name",
        designation: "Designation",
        email: "Email ID",
        phoneno: "Phone no",
        gender: "Gender",
      },
      operation: {
        view: ['job_app_without_ajax/fetch', "candidate_id", "View"],
        update: ['job_app_without_ajax/update', "candidate_id", "Edit"],
        delete: ['job_app_without_ajax/delete', "candidate_id", "Remove"]
      }
    }

    response.render("job_app_without_ajax/view", { table: table });
  }
  catch {
    response.render("job_app_without_ajax/view");
  }
})

module.exports = viewAllCandidates;