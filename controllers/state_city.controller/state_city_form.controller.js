const isAuthentication = require('../../middlewares/isAuthentication.middleware');

const state_city_form = ((request, response)=>{
    response.render("state_city/state_city_form");
})

module.exports = state_city_form;