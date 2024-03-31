const getPosts = ((request, response)=>{
    response.render("api_call_json/posts");
})
module.exports = getPosts;