const isAuthentication = require('../../middlewares/isAuthentication.middleware');
const validation = require('../../middlewares/validation.middleware');
const database = require('../../services/database');

const update = require('express').Router();

const candidateUpdateGet = ((request, response)=>{
    response.render("job_app_ajax/form");
})

const candidateUpdatePost = (async(request,response)=>{
    const candidate_id = request.params.id;
    const db = new database(process.env.DB_DATABASE);

    let result = await db.updateData("candidate_masters1", request.body.candidate_masters, {id: candidate_id});
    if(typeof result == 'string')
    {
        response.send({error: `Something is wrong ${result}`});
    }

    const education_details = request.body.education_details;
    for(let i=0; i<education_details.length; i++)
    {
        let item = education_details[i];
        delete item.id;
        result = await db.updateData("education_details1", item, {
            candidate_id: candidate_id,
            course: item.course
        })
        if(typeof result  == 'string')
            response.send({error: `Something is wrong ${result}`});

        if(result.affectedRows == 0)
        {
            item['candidate_id'] = candidate_id;
            result = await db.insertData("education_details1", item)
            if(typeof result  == 'string')
                response.send({error: `Something is wrong ${result}`});
        }
    }

    await request.body.work_experiences.forEach(async item => {
        delete item.id;
        result = await db.updateData("work_experiences1", item, {
            candidate_id: candidate_id,
            company_name:item.company_name
        })
        if(typeof result  == 'string')
            response.send({error: `Something is wrong ${result}`});

        if(result.affectedRows == 0)
        {
            item['candidate_id'] = candidate_id;
            result = await db.insertData("work_experiences1", item)
            if(typeof result  == 'string')
                response.send({error: `Something is wrong ${result}`});
        }
    });
    
    await request.body.languages.forEach(async item => {
        result = await db.updateData("languages1", item, {
            candidate_id: candidate_id,
            language:item.language
        })
        if(typeof result  == 'string')
            response.send({error: `Something is wrong ${result}`});

        if(result.affectedRows == 0)
        {
            item['candidate_id'] = candidate_id;
            result = await db.insertData("languages1", item)
            if(typeof result  == 'string')
                response.send({error: `Something is wrong ${result}`});
        }
    });

    await request.body.technologies.forEach(async item => {
        result = await db.updateData("technologies1", item, {
            candidate_id: candidate_id,
            technology:item.technology
        })
        if(typeof result  == 'string')
            response.send({error: `Something is wrong ${result}`});

        if(result.affectedRows == 0)
        {
            item['candidate_id'] = candidate_id;
            result = await db.insertData("technologies1", item)
            if(typeof result  == 'string')
                response.send({error: `Something is wrong ${result}`});
        }
    });

    await request.body.reference_contacts.forEach(async item => {
        result = await db.updateData("reference_contacts1", item, {
            candidate_id: candidate_id,
            name:item.name
        })
        if(typeof result  == 'string')
            response.send({error: `Something is wrong ${result}`});

        if(result.affectedRows == 0)
        {
            item['candidate_id'] = candidate_id;
            result = await db.insertData("reference_contacts1", item)
            if(typeof result  == 'string')
                response.send({error: `Something is wrong ${result}`});
        }
    });

    response.send({error: "Data is updated"})
})

module.exports = {
    candidateUpdateGet,
    candidateUpdatePost
};