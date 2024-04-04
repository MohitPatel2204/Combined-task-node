const stateCityForm = ((request, response) => {
	try {
		response.render("state_city/state_city_form");
	}
	catch {
		response.render("error");
	}
})

module.exports = stateCityForm;