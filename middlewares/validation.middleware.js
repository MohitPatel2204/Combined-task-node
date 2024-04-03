const createObject = (arr, data) => {
	let result = {};
	arr.forEach(item => {
		result[item] = typeof data[item] == 'string'?data[item]:JSON.stringify(data[item]);
	});
	return result;
}

const arraysToObjects = (arr, keys, uniqueField) => {
	let result = [];

	arr = arr.map((item)=>{
		if(!Array.isArray(item))
			return Array(item);
		return item;
	})

	let set = new Set(arr[uniqueField]);
	if (uniqueField >= 0 && set.length < arr[uniqueField].length) {
		return false;
	}
	
	for (let i = 0; i < arr[0].length; i++) {
		let obj = {};
		for (let j = 0; j < keys.length; j++) {
			if (arr[j][i] != "") {
				obj[keys[j]] = arr[j][i]
			}
		}
		result.push(obj)
	}
	return result;
}
const arraysToObjects1 = (data, arr, keys) => {
	let result = [];

	arr.forEach(item=>{
		if(Object.keys(data).indexOf(item)>=0)
		{
			let obj = {}
			obj[keys[0]] = item;
			obj[keys[1]] = JSON.stringify(data[item].slice(1, data[item].length));
			result.push(obj);
		}
	})

	return result;
}

const validation = (request, response, next) => {
	let data = request.body;
	request.body={};
	
	let candidate_masters = {
		first_name: data.first_name,
		last_name: data.last_name,
		designation: data.designation,
		email: data.email,
		phone_no: data.phone_no,
		gender: data.gender,
		relationship: data.relationship,
		birthdate: data.birthdate,
		state: data.state,
		city: data.city,
		address: JSON.stringify(data.address),
		prefered_location: JSON.stringify(data.prefered_location),
		notice_period: data.notice_period,
		expected_ctc: data.expected_ctc,
		current_ctc: data.current_ctc,
		department: data.department,    
	}
	if(data.candidate_id != "")
		candidate_masters['id'] = data.candidate_id;
	request.body['candidate_masters'] = candidate_masters;

	request.body['education_details']  = arraysToObjects([
		data.education_id,
		data.course,
		data.board,
		data.passing_year,
		data.percentage
	], ['id', 'course', 'board', 'passing_year', 'percentage'], 1);

	request.body['reference_contacts']  = arraysToObjects([
		data.reference_id,
		data.name,
		data.contact,
		data.relation,
	], ['id', 'name', 'contact', 'relation'], 1);
	
	request.body['work_experiences']  = arraysToObjects([
		data.work_id,
		data.company_name,
		data.work_designation,
		data.from_date,
		data.to_date,
	], ['id', 'company_name', 'work_designation', 'from_date','to_date'], 1);

	request.body['languages'] = arraysToObjects1(data, ['hindi', 'gujrati', 'english'], ['language', 'language_lvl'])
	request.body['technologies'] = arraysToObjects1(data, ['php', 'mysql', 'laravel', 'oracle'], ['technology', 'technology_lvl'])
	next();
}
module.exports = validation;