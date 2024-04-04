const requiredString = (data, check) => {
	let keys = Object.keys(check);
	for(let i=0; i<keys.length; i++)
	{
		if(data[keys[i]] == "" || typeof data[keys[i]] == 'undefined')
		{
			return keys[i];
		}
	}
	return true;
}

const arrayRequired = (data, check) => {
  
	for(let i=0; i<check.length; i++)
	{
		let obj = check[i];
		let inputs = data[obj.name];
		let count = 0;
		if(typeof inputs != 'undefined')
		{
			inputs.forEach(input=>{
				if(input != "")
					count++;
			})
		}   
		if(count == 0)
			data[obj.name] = null;
		if(obj.required == true && count >= obj.size) 
			continue;
		else if(obj.required==false && (count == 0 || obj.size <= count)) 
			continue;
		else
			return {flag:false, ...obj};
	}
	return {flag: true, data: data};
}

const regularExp = (type, data) => {
	let EMAIL = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
	let CONTACT = new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$");
	let DATE = new RegExp("(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[1,2])\/(19|20)\d{2}");

	switch(type)
	{
		case "email":
			if(EMAIL.test(data)==true)
				return true;
			break;
		case "mobile":
			if(CONTACT.test(data))
				return true;
			break;
		case "date":
			if(DATE.test(data))
				return true;
			break;
	}
	return data;
}

const arraysToObjects = (arr, keys, uniqueField = 0) => {
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

module.exports = {
	requiredString,
	regularExp,
	arrayRequired,
	arraysToObjects
}