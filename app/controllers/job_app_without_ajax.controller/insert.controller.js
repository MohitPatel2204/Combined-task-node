const insertData = require("../../../services/job_app_without_ajax/insertData");

const insertPost = (async(request, response)=>{
    let data = request.body;
    try{
        let result = await insertData(data);
        if(result==true)
        {
            response.redirect("/job_app_without_ajax/candidates");
        }
        else
        {
            response.method="GET";
            response.render("job_app_without_ajax/form", {error: result});
        }
    }
    catch{
        response.render("job_app_without_ajax/form", {error: "Server side error, data not inserted...."});
    }
})

const insertGet = ((request, response)=>{
    try
    {
        response.render("job_app_without_ajax/form");
    }
    catch{
        response.render("error");
    }
})

module.exports = {
    insertGet,
    insertPost,
};
