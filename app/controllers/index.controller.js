const index = ((request,response)=>{
    try{
        response.render("index");
    }
    catch{
        response.render("error");
    }
})

module.exports = index;