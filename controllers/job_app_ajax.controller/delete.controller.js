const isAuthentication = require('../../middlewares/isAuthentication.middleware');
const database = require('../../services/database');

const deleteCandidate = require('express').Router();

deleteCandidate.get('/job_app_ajax/delete/:id', isAuthentication,async(request, response)=>{
    const candidate_id = request.params.id;

    const db = new database(process.env.DB_DATABASE);

    let result = await db.deleteData("work_experiences1", {candidate_id: candidate_id});
    if(typeof result  == 'string')
        response.send({error: `Something is wrong ${result}`});

    result = await db.deleteData("technologies1", {candidate_id: candidate_id});
    if(typeof result  == 'string')
        response.send({error: `Something is wrong ${result}`});

    result = await db.deleteData("reference_contacts1", {candidate_id: candidate_id});
    if(typeof result  == 'string')
        response.send({error: `Something is wrong ${result}`});

    result = await db.deleteData("languages1", {candidate_id: candidate_id});
    if(typeof result  == 'string')
        response.send({error: `Something is wrong ${result}`});
    
    result = await db.deleteData("education_details1", {candidate_id: candidate_id});
    if(typeof result  == 'string')
        response.send({error: `Something is wrong ${result}`});
        
    result = await db.deleteData("candidate_masters1", {id: candidate_id});
    if(typeof result  == 'string')
        response.send({error: `Something is wrong ${result}`});

    response.redirect("job_app_ajax/candidates");
})

module.exports = deleteCandidate;