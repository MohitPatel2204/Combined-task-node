let current = 0;   

const isRequiredString = (obj) =>{
	keys = Object.keys(obj);
	let error = [];
	for(let i=0; i<keys.length; i++)
	{
		if(document.getElementById(keys[i]).value.trim()=="")
		{
			error.push(keys[i]);
		}
	}
	return error;
}

const isNumberString = (obj) =>{
	let keys = Object.keys(obj);
	let error= [];
	for(let i=0; i<keys.length; i++)
	{
		if(!isNaN(document.getElementById(keys[i]).value.trim()))
		{
			error.push(keys[i]);
		}
	}
	return error;
}

const regularExp = (type, id) => {
	let EMAIL = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
	let CONTACT =  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
	let DATE = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
	switch(type)
	{
		case "email":
			if(EMAIL.test(document.getElementById(id).value.trim()))   
				return true;
			break;
		case "mobile":
			if(CONTACT.test(document.getElementById(id).value.trim()))
				return true;
			break;
		case "date":
			if(DATE.test(document.getElementById(id).value.trim()))
				return true;
			break;
	}
	return id;
}

const isArraySame = (arr) => {
	let error = [];
	let count = 0;
	for(let i=0; i<arr.length; i++)
	{
		let obj = arr[i];
		let result = []
		obj.data.forEach(item=>{
			item = document.getElementsByName(item)
			let row = [];
			item.forEach(element => {
				if(element.value.trim() != "")
					row.push(element.value.trim())
			});
			result.push(row);
		})

		let size = result[0].length;
		for(let j=0; j<result.length; j++)
		{
			if(size != result[j].length)
			{
				error.push(obj);
			}
		}
	}
	return error;
}

const arrayRequired = (arr) => {
	let error = [];
	for(let i=0; i<arr.length; i++)
	{
		let obj = arr[i];
		let inputs = document.getElementsByName(obj.name);
		let count = 0;
		if(obj.type=="text")
		{
			inputs.forEach(input=>{
				if(input.value.trim() != "")
					count++;
			})
		}
		else
		{
			inputs.forEach(input=>{
				if(input.checked == true)
					count++;
			})
		}
		if(obj.required == true && count >= obj.size) 
			continue;
		else if(obj.required==false && (count == 0 || obj.size <= count))
		{
			continue;
		} 
		else
		{
			error.push(obj);
		}
	}
	return error;
}

const is_valid_basic_detail = () => {
	let errorArray = [];

	let obj = {
		first_name: "First name",
		last_name: "Last name",
		designation: "Designation",
		email: "Email ID",
		phone_no: "Phone no",
		relationship: "Relationship",
		birthdate: "Birthdate",
		state: "State",
		city: "City",
	}
	let res = isRequiredString(obj);
	res.forEach(item=>{
		if(errorArray.indexOf(item)<0)
			errorArray.push(item);
	})

	obj = {
		first_name: "First name",
		last_name: "Last name",
		designation: "Designation",
		relationship: "Relationship",
		state: "State",
		city: "City",
	}

	res = isNumberString(obj);
	res.forEach(item=>{
		if(errorArray.indexOf(item)<0)
			errorArray.push(item);
	})

	if(regularExp("email", "email")!=true)
	{
		if(errorArray.indexOf("email")<0)
			errorArray.push('email')
	}
	if(regularExp("mobile", "phone_no")!=true)
	{
		if(errorArray.indexOf("phone_no")<0)
			errorArray.push('phone_no')
	}
	if(regularExp("date", "birthdate")!=true)
	{
		if(errorArray.indexOf("birthdate")<0)
			errorArray.push('birthdate')
	}

	if(errorArray.length>0)
	{
		document.getElementsByName(errorArray[0])[0].focus();
		errorArray.forEach(item=>{
			printErrorMessage(item, `${item} is invalid....`);
		})
		return false;
	}
	return true;
}

const is_valid_education_details = () => {
	let obj = [{
		label: "Education",
		data: ['course', 'board', 'passing_year', 'percentage'],
		require: false
	}]
	let result = isArraySame(obj);
	result = result.map(item=>item.data[0]);
	let errorArray = [];
	result.forEach(item=>{
		if(errorArray.indexOf(item)<0)
			errorArray.push(item);
	})

	if(errorArray.length > 0)
	{
		document.getElementById("error").style.display = 'block';
		document.getElementById("error").className = 'alert text-center alert-danger';
		document.getElementById("error").innerHTML = 'Error eduction is invalid'
		return false;
	}
	return true;
}

const is_valid_work = () => {
	let obj = [{
		label: "Work experiences",
		data: ['company_name', 'work_designation', 'from_date', 'to_date'],
		require: false
	}]

	let result = isArraySame(obj);
	result = result.map(item=>item.data[0]);
	let errorArray = [];
	result.forEach(item=>{
		if(errorArray.indexOf(item)<0)
			errorArray.push(item);
	})

	if(errorArray.length > 0)
	{
		document.getElementById("error").style.display = 'block';
		document.getElementById("error").className = 'alert text-center alert-danger';
		document.getElementById("error").innerHTML = 'Error eduction is invalid'
		return false;
	}
	return true;
}

const is_valid_language = () => {
	let obj = [
		{
			name: "hindi",
			label: "Hindi language",
			size: 2,
			type: "select",
			required: false
		},
		{
			name: "english",
			label: "English language",
			size: 2,
			type: "select",
			required: false
		},
		{
			name: "gujrati",
			label: "Gujrati language",
			size: 2,
			type: "select",
			required: false
		},
	]

	let result = arrayRequired(obj);
	result = result.map(item=>item.name);
	if(result.length > 0)
	{
		result.forEach(item=>{
			printErrorMessage(item, `${item} is invalid....`)
		})
		return false;
	}
	return true;
}

const is_valid_technology = () => {
	let obj = [
		{
			name: "php",
			label: "PHP language",
			size: 2,
			type: "select",
			required: false
		},
		{
			name: "mysql",
			label: "MySQL language",
			size: 2,
			type: "select",
			required: false
		},
		{
			name: "oracle",
			label: "Oracle language",
			size: 2,
			type: "select",
			required: false
		},
		{
			name: "laravel",
			label: "Laravel language",
			size: 2,
			type: "select",
			required: false
		},
	]

	let result = arrayRequired(obj);
	result = result.map(item=>item.name);
	if(result.length > 0)
	{
		result.forEach(item=>{
			printErrorMessage(item, `${item} is invalid....`)
		})
		return false;
	}
	return true;
}

const is_valid_reference = () => {
	let obj = [{
		label: "References contact",
		data: ['name', 'contact', 'relation'],
		require: false
	}]

	let result = isArraySame(obj);
	result = result.map(item=>item.data[0]);
	let errorArray = [];
	result.forEach(item=>{
		if(errorArray.indexOf(item)<0)
			errorArray.push(item);
	})

	if(errorArray.length > 0)
	{
		document.getElementById("error").style.display = 'block';
		document.getElementById("error").className = 'alert text-center alert-danger';
		document.getElementById("error").innerHTML = 'Error eduction is invalid'
		return false;
	}
	return true;
}

const is_valid_preference = () => {
	let obj = {
		prefered_location: "Prefered location",
		expected_ctc: "Expected CTC",
		department: "Department"
	}
	let res = isRequiredString(obj);
	if(res.length>0)
	{
		document.getElementsByName(res[0])[0].focus();
		res.forEach(item=>{
			printErrorMessage(item, `${item} is invalid....`);
		})
		return false;
	}
	return true;
}

const pageination = (flag) => {
	removeErrorMessage();

	document.getElementById("error").style.display = 'none';
	const header = document.getElementById("header_section").children;
	const body = document.getElementById("form_section").children;
	const total = body.length-1;
	const next_btn = document.getElementById("next");
	const prev_btn = document.getElementById("prev");

	switch(current)
	{
		case 0:
			if(is_valid_basic_detail()==false)
				return false;
			break;
		case 1:
			if(is_valid_education_details() == false)
				return false;
			break;
		case 2:
			if(is_valid_work()==false)
				return false;
			break;
		case 3:
			if(is_valid_language() == false)
				return false;
			break;
		case 4:
			if(is_valid_technology() == false)
				return false;
			break;
		case 5:
			if(is_valid_reference() == false)
				return false;
			break;
		case 6:
			if(is_valid_preference() == false)
				return false;   
			break;
	}

	header[current].className = "col-md text-primary p-3 text-center";
	body[current].style.display = 'none';
	current = current+flag;
	header[current].className = "col-md bg-primary p-3 text-light text-center";
	body[current].style.display = 'block';
	prev_btn.className = "btn btn-outline-primary";
	next_btn.className = "btn btn-outline-primary";

	if(current<=0)
	{
		prev_btn.className = "btn btn-outline-primary disabled";
		next_btn.className = "btn btn-outline-primary";
	}
	if(current > total-1)
	{
		next_btn.className = "btn btn-outline-primary disabled";
		prev_btn.className = "btn btn-outline-primary";
	}
	return true;
}

const removenode = (node) => {
	const parent = node.parentNode;
	parent.remove();   
}

const add = (node, size) => {
	const parent = document.getElementById(node).parentNode;
	if(parent.children.length <= size)
	{
		const copy = parent.children[1].cloneNode(true);
		const p = document.createElement("p");
		p.setAttribute("class", "btn btn-danger m-2");
		p.innerHTML = "Remove";
		p.setAttribute("onclick", "removenode(this)");
		copy.appendChild(p);
		parent.appendChild(copy)
	}
}

const printErrorMessage = (id, msg) => {
    let node = document.getElementsByName(id)[0].parentNode;
    node.innerHTML += `<span class='text-danger'>${msg}</span>`;
}

const removeErrorMessage = () => {
    const errors = document.querySelectorAll('span.text-danger')
    errors.forEach(error=>error.remove())
}