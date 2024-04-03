const { requiredString, arrayRequired, regularExp, arraysToObjects } = require("../services/job_app_without_ajax/validation");

const formValidate = (request, response, next) => {
  response.method = "GET";
  if (Object.keys(request.body).length <= 0) {
    let error_message = "Data is not found";
    response.render("job_app_without_ajax/form", { error: error_message });
  }
  else {
    let result = arraysToObjects([
      request.body['coursename[]'],
      request.body['board[]'],
      request.body['passingyear[]'],
      request.body['percentage[]']
    ], ['course', 'board', 'passingyear', 'percentage'], 0);
    if (result == false) {
      let error_message = `Please, Enter course name unique...`;
      response.render("job_app_without_ajax/form", { error: error_message });
    }
    else {
      request.body['education'] = result;
      delete request.body['coursename[]'];
      delete request.body['board[]'];
      delete request.body['passingyear[]'];
      delete request.body['percentage[]'];
    }

    result = arraysToObjects([
      request.body['companyname[]'],
      request.body['work_designation[]'],
      request.body['form_date[]'],
      request.body['to_date[]']
    ], ["company", "designation", "form_date", "to_date"]);
    if (result == false) {
      let error_message = `Please, Enter work experience name unique...`;
      response.render("job_app_without_ajax/form", { error: error_message });
    }
    else {
      request.body['work'] = result;
      delete request.body['companyname[]'];
      delete request.body['work_designation[]'];
      delete request.body['form_date[]'];
      delete request.body['to_date[]'];
    }


    result = arraysToObjects([
      request.body['ref_name[]'],
      request.body['ref_contact[]'],
      request.body['ref_relation[]'],
    ], ['ref_name', 'ref_contact', 'ref_relation']);
    if (result == false) {
      let error_message = `Please, Enter references name unique...`;
      response.render("job_app_without_ajax/form", { error: error_message });
    }
    else {
      request.body['reference'] = result;
      delete request.body['ref_name[]'];
      delete request.body['ref_contact[]'];
      delete request.body['ref_relation[]'];
    }

    let obj1 = {
      firstname: "First name",
      lastname: "Last name",
      designation: "Designation",
      email: "Email",
      phno: "Phone no",
      gender: "Gender",
      relationshipstatus: "Relationship status",
      dob: "Birthdate",
      state: "State",
      city: "City",
      expectedctc: "Expected CTC",
      'department[]': "Department",
    }
    let result1 = requiredString(request.body, obj1);

    let obj2 = [
      {
        name: "hindilanguage[]",
        label: "Hindi language",
        size: 2,
        required: false
      },
      {
        name: "englishlanguage[]",
        label: "English language",
        size: 2,
        required: false
      },
      {
        name: "gujratilanguage[]",
        label: "Gujrati language",
        size: 2,
        required: false
      },
      {
        name: "phpchk[]",
        label: "PHP language",
        size: 2,
        required: false
      },
      {
        name: "oraclechk[]",
        label: "Oracle language",
        size: 2,
        required: false
      },
      {
        name: "mysqlchk[]",
        label: "Mysql language",
        size: 2,
        required: false
      },
      {
        name: "laravelchk[]",
        label: "Laravel language",
        size: 2,
        required: false
      },
    ]

    let result2 = arrayRequired(request.body, obj2);

    if (result1 != true) {
      let error_message = `Please, Enter ${obj1[result1]}...`;
      response.render("job_app_without_ajax/form", { error: error_message });
    }
    else if (regularExp("email", request.body.email) != true) {
      let error_message = `Please, Enter Valid Email...`;
      response.render("job_app_without_ajax/form", { error: error_message });
    }
    else if (regularExp("mobile", request.body.phno) != true) {
      let error_message = `Please, Enter Valid Phone number...`;
      response.render("job_app_without_ajax/form", { error: error_message });
    }
    else if (result2.flag != true) {
      let error_message = `Please, Enter valid ${result2.label}`;
      response.render("job_app_without_ajax/form", { error: error_message });
    }
    else {
      request.body = result2.data;
      next();
    }
  }
}

module.exports = formValidate;
