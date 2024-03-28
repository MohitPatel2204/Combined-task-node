const resultAll = `
select distinct student.sid, fname, 
sum(
	case when ex_type_1 = "Prilium" and ex_type_2 = "Theory" then obtained_mark 
    else 0 end
) as "Total_prilium_theory",
sum(
	case when ex_type_1 = "Prilium" and ex_type_2 = "Prectical" then obtained_mark 
    else 0 end
) as "Total_prilium_practical",
sum(
	case when ex_type_1 = "Terminal" and ex_type_2 = "Theory" then obtained_mark 
    else 0 end
) as "Total_terminal_theory",
sum(
	case when ex_type_1 = "Terminal" and ex_type_2 = "Prectical" then obtained_mark 
    else 0 end
) as "Total_terminal_practical",
sum(
	case when ex_type_1 = "Final" and ex_type_2 = "Theory" then obtained_mark 
	else 0 end
) as "Total_final_theory",
sum(
	case when ex_type_1 = "Final" and ex_type_2 = "Prectical" then obtained_mark 
	else 0 end
) as "Total_final_practical",
sum(obtained_mark) as Total
from 
student left join result on student.sid = result.sid 
left join exam_type_master on result.exam_type_id = exam_type_master.exam_type_id
where
att = 'p'
group by result.sid;
`;

const queryFindStudent = (sid) =>{
	return `
	select sid, fname, gender, email, mobileno, date_format(dob, "%d-%m-%Y") as birthdate from student where sid = ${sid};
	`;
}

const queryFindStudentMark = (sid) => {
	return `
	select 
	sub_name,
	sum(case
		when ex_type_1 = "Prilium" and ex_type_2 = "Theory" then obtained_mark else 0 
	end) as "Prilum_theory",
	sum(case
		when ex_type_1 = "Prilium" and ex_type_2 = "Prectical" then obtained_mark else 0 
	end) as "Prilum_prectical",
	sum(case
		when ex_type_1 = "Terminal" and ex_type_2 = "Theory" then obtained_mark else 0 
	end) as "Terminal_theory",
	sum(case
		when ex_type_1 = "Terminal" and ex_type_2 = "Prectical" then obtained_mark else 0 
	end) as "Terminal_prectical",
	sum(case
		when ex_type_1 = "Final" and ex_type_2 = "Theory" then obtained_mark else 0 
	end) as "Final_theory",
	sum(case
		when ex_type_1 = "Final" and ex_type_2 = "Prectical" then obtained_mark else 0 
	end) as "Final_prectical",
	sum(obtained_mark) as 'total_mark'
	from 
	result left join exam_type_master on result.exam_type_id = exam_type_master.exam_type_id
	left join subject_master on result.sub_id = subject_master.sub_id
	where sid = ${sid}
	group by result.sub_id;
	`;
}

const queryFindStudentFinalResult = (sid) =>{
	return `
	select 
	sum(obtained_mark) as 'total',
	sum(obtained_mark)/6 as 'percentage'
	from result
	where sid = ${sid};
	`;
}

const queryFindAttendance  = sid =>{
	return `
	select 
	sum(
		case 
			when att = "p" then 1 else 0
		end
	) as 'No_of_present_day',
	sum(
		case 
			when att = "a" then 1 else 0
		end
	) as 'No_of_absent_day',
	count(sid) as 'Total_day'
	from attendance
	where sid = ${sid};
	`;
}

module.exports = {
	resultAll : resultAll, 
	queryFindStudent : queryFindStudent, 
	queryFindAttendance : queryFindAttendance, 
	queryFindStudentFinalResult : queryFindStudentFinalResult, 
	queryFindStudentMark : queryFindStudentMark
};