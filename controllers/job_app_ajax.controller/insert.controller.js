const isAuthentication = require("../../middlewares/isAuthentication.middleware");
const validation = require("../../middlewares/validation.middleware");
const database = require("../../services/database");
const insert = require("express").Router();

insert.get("/job_app_ajax/insert_candidate", isAuthentication,(request, response)=>{
    response.render("job_app_ajax/form")
})

insert.post("/job_app_ajax/insert_candidate", isAuthentication, validation,async(request, response)=>{
    const db = new database(process.env.DB_DATABASE);
    let result;
    result = await db.insertData("candidate_masters1", request.body.candidate_masters)
    if(typeof result == 'string')
    {
        response.send({'error': 'Something is wrong' + result});
    }
    const candidate_id = result.insertId;

    const educations = request.body.education_details;
    for(let i=0; i<educations.length; i++) {
        let item = educations[i];
        item['candidate_id'] = candidate_id;
        result = await db.insertData("education_details1", item)
        if(typeof result == 'string')
            response.send({'error': 'Something is wrong' + result});
    }

    const languages = request.body.languages;
    for(let i=0; i<languages.length; i++) {
        let item = languages[i];
        item['candidate_id'] = candidate_id;
        result = await db.insertData("languages1", item)
        if(typeof result == 'string')
            response.send({'error': 'Something is wrong' + result});
    }

    const reference_contacts = request.body.reference_contacts;
    for(let i=0; i<reference_contacts.length; i++) {
        let item = reference_contacts[i];
        item['candidate_id'] = candidate_id;
        result = await db.insertData("reference_contacts1", item)
        if(typeof result == 'string')
            response.send({'error': 'Something is wrong' + result});
    }
    
    const technologies = request.body.technologies;
    for(let i=0; i<technologies.length; i++) {
        let item = technologies[i];
        item['candidate_id'] = candidate_id;
        result = await db.insertData("technologies1", item)
        if(typeof result == 'string')
            response.send({'error': 'Something is wrong' + result});
    }
    
    const work_experiences = request.body.work_experiences;
    for(let i=0; i<work_experiences.length; i++) {
        let item = work_experiences[i];
        item['candidate_id'] = candidate_id;
        result = await db.insertData("work_experiences1", item)
        if(typeof result == 'string')
            response.send({'error': 'Something is wrong' + result});
    }
    
    response.send({'error': "Data is sucessfully inserted"})
})

module.exports = insert;