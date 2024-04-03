const events = ((request, response)=>{
    try{
        response.render("javascript_ex/events");
    }
    catch(error){
        response.render("error");
    }
})

module.exports = events;