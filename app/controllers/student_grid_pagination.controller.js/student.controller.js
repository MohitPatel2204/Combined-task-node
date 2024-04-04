const database = require('../../../services/database');
const pagination = require('../../../services/student_grid_pagination/pagination');

const studentOperation = (async (request, response) => {
	let page = undefined;
	let db = new database(process.env.DB_DATABASE);
	try {
		let totalRecord = await db.executeQuery("select count(*) as no_of_std from student");
		if (page) {
			page = pagination(request.params.operation, totalRecord[0]['no_of_std'], 100, page.currentPageno);
		}
		else {
			page = pagination(request.params.operation, totalRecord[0]['no_of_std'], 100, 1);
		}

		let field = {
			sid: "Student ID",
			fname: "First Name",
			lname: "Last Name",
			email: "Email ID",
			gender: "Gender",
			mobileno: "Mobile No.",
			dob: "Date of Birth",
			country: "Country",
			city: "City",
			create_date: "Created Date"
		}

		let query = `select * from student order by ${request.params.key} ${request.params.order} limit ${page.currentPageno * 100}, ${100};`;
		res = await db.executeQuery(query);

		page["key"] = request.params.key;
		page["order"] = request.params.order;
		response.render("student_grid_pagination/index", { "page": page, "fields": field, "result": res });
	}
	catch {
		response.render("error");
	}
})

const students = ((request, response) => {
	try {
		response.redirect(`/student/first/sid/asc`);
	}
	catch {
		response.redirect("*");
	}
})

module.exports = { students, studentOperation };