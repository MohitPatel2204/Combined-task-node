const getData = require("./getData")

const getUser = (userid) => {
	try
	{
		let data = getData();
		let user = {};
		if(data)
		{
			user = data[userid];
		}
		return user;
	}
	catch(error)
	{
		throw error;
	}
}

module.exports = getUser;