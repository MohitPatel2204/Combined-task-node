const home = ((request,response)=>{
    try{
        response.render("login/home");
    }
    catch{
        response.render("error");
    }
})

module.exports = home;