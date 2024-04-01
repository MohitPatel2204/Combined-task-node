// const isAuthentication = require("../../middlewares/isAuthentication.middleware");
const database = require("../../services/database");

// const candidate = require("express").Router();

const candidateAPI = (async(request, response)=>{
    let candidate_result = {};
    const db = new database(process.env.DB_DATABASE);
    const candidate_id = request.params.id;

    result = await db.executeQuery(`select * from candidate_masters1 where id = ${candidate_id}`);
    if(result.length > 0)
    {
        candidate_result['flag'] = true;
        result[0].address =JSON.parse(result[0].address)
        result[0].prefered_location =JSON.parse(result[0].prefered_location)
        candidate_result['basic_detail'] = result[0];

        // fetch education deatils
        candidate_result['educations'] = await db.executeQuery(`select id,course, board, passing_year, percentage from education_details1 where candidate_id = ${candidate_id}`);

        // fetch languages detailsn
        result = await db.executeQuery(`select * from languages1 where candidate_id = ${candidate_id}`);
        result.forEach(element => {
            element.language_lvl = JSON.parse(element.language_lvl);
        });
        candidate_result['languages'] = result;

        // fetch refernces
        result = await db.executeQuery(`select id, name, contact, relation from reference_contacts1 where candidate_id = ${candidate_id}`);
        candidate_result['reference_contact'] = result;
        
        // fetch technolgy
        result = await db.executeQuery(`select * from technologies1 where candidate_id = ${candidate_id}`);
        result.forEach(element => {
            element.technology_lvl = JSON.parse(element.technology_lvl);
        });
        candidate_result['technologies'] = result;

        // fetch work experience 
        result = await db.executeQuery(`select id, company_name, work_designation, from_date, to_date from work_experiences1 where candidate_id = ${candidate_id}`);
        candidate_result['work'] = result;
        
        response.send(candidate_result)
    }
    else
    {
        response.send({
            flag: false,
        })
    }
})

module.exports = candidateAPI;
