const student = require('express').Router();
const database = require('../../services/database');
const pagination = require('../../services/student_grid_pagination/pagination');

student.get("/student/:operation/:key/:order", async(request, response)=>{
    let page = undefined;
    let db = new database(process.env.DB_DATABASE);
    let totalRecord = await db.executeQuery("select count(*) as no_of_std from student");
    if(page)
    {
        page = pagination(request.params.operation, totalRecord[0]['no_of_std'], 100, page.currentPageno);
    }
    else 
    {
        page = pagination(request.params.operation, totalRecord[0]['no_of_std'], 100, 1);
    }
    
    let field = {
        sid : "Student ID",
        fname : "First Name",
        lname : "Last Name",
        email : "Email ID",
        gender : "Gender",
        mobileno : "Mobile No.",
        dob : "Date of Birth",
        country : "Country",
        city : "City",
        create_date : "Created Date"
    }

    let query = `select * from student order by ${request.params.key} ${request.params.order} limit ${page.currentPageno*100}, ${100};`;
    res = await db.executeQuery(query);
    
    page["key"] = request.params.key;
    page["order"] = request.params.order;
    response.render("student_grid_pagination/index", {"page": page, "fields" : field, "result": res});
})

student.get("/student", (request, response)=>{
    response.redirect(`/student/first/sid/asc`);
})

module.exports = student;