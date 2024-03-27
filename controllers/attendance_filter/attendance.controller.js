const isAuthentication = require('../../middlewares/isAuthentication.middleware');
const database = require('../../services/database');
const pagination = require('../../services/student_grid_pagination/pagination');

const attendance = require('express').Router();

attendance.get("/attendance/:operation/", isAuthentication,async(request, response)=>{
    let page = undefined;

    let query, month, year;
    if(request.query.month && request.query.year)
    {
        month = request.query.month;
        year = request.query.year;
    }
    else
    {
        month = 1;
        year = 2024;
    }

    const db = new database(process.env.DB_DATABASE);
    let totalRecord = await db.executeQuery(`
        select count(*) as no_of_std from student;
    `);

    if(page)
    {
        page = pagination(request.params.operation, totalRecord[0]['no_of_std'], 50, page.currentPageno);
    }
    else 
    {
        page = pagination(request.params.operation, totalRecord[0]['no_of_std'], 50, 1);
    }

    query = `
        select 
        student.sid, fname, lname, 
        count(attendance.sid) as no_of_day, 
        concat(round(count(attendance.sid)/0.3, 2), "%") as "percentage" 
        from student left join attendance 
        on student.sid = attendance.sid
        where att = 'p' and MONTH(att_date) = ${month} and YEAR(att_date) = ${year}
        group by attendance.sid limit ${page.currentPageno*50}, ${50};
    `;
    let result = await db.executeQuery(query);


    let fields = {
        sid: "Student ID",
        fname: "First Name",
        lname: "Last Name",
        no_of_day: "Present Day",
        percentage: "Percentage"
    }
    let selectedValue = {
        month: month,
        year: year
    }
    response.render("attendance_filter/attendance", {fields, result, page, selectedValue});
})

attendance.get("/attendance", async(request, response)=>{
    response.redirect(`/attendance/first`);
})

module.exports = attendance;