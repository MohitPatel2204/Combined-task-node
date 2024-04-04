const menu = ((request,response)=>{
	try{
		response.render("login/menu");
	}
	catch{
		response.render("error");
	}
})

module.exports = menu;