const path = require("path");
const fs = require("fs");

const getData = () => {
	let result = {};
	let dir = path.join(__dirname, "../../data");
	let file = "user.json";
	
	if(fs.existsSync(path.join(dir, file)))
	{
		result = JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8", error=>{
			if(error) throw error;
		}));
	}
	return result;
}
module.exports = getData;