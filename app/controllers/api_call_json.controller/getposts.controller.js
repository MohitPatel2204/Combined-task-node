const getPosts = ((request, response) => {
	try {
		response.render("api_call_json/posts");
	}
	catch {
		response.render("error");
	}
})
module.exports = getPosts;