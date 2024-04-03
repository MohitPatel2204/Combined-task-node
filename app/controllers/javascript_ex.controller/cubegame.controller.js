const cubegame = ((request, response)=>{
    try{
        response.render("javascript_ex/cube_game");
    }
    catch{
        response.render("error");
    }
})

module.exports = cubegame;