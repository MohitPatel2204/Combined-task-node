const database = require("../database");

const selectDataWithId = async(id) => {
    let candidate = {};
    let db = new database(process.env.DB_DATABASE);
    
    // fetch candidate basic details
    let result = await db.executeQuery(`select * from candidates_master where candidate_id = ${id}`);
    if(typeof result == "string")
        return null;
    
    if(result.length<=0)
    {
        return {
            error: "Data is not found"
        };
    }
    result[0].prefered_location = result[0].prefered_location.split(",");
    candidate["basic"] = result[0];
    candidate_id = result[0].candidate_id;
    
    //fetch education details 
    result = await db.executeQuery(`select course, board, passingyear, percentage from educations where candidate_id = ${candidate_id}`);
    candidate['education'] = result.length > 0?result.map(item=>Object.values(item)):null;

    // fetch work experince 
    result = await db.executeQuery(`SELECT company_name, designation, from_date, to_date FROM work_experiences where candidate_id = ${candidate_id}`);
    candidate['work']  = result.length > 0?result.map(item=>Object.values(item)):null;
    
    // fetch laguage data
    result = await db.executeQuery(`select lan, language_lvl from languages where candidate_id = ${candidate_id}`);
    candidate['language'] = result.length > 0?result.map(item=>Object.values(item)):null;
    
    // fetch technology data
    result = await db.executeQuery(`select technology, tech_lvl from technologies where candidate_id = ${candidate_id}`);
    candidate['technology'] = result.length > 0?result.map(item=>Object.values(item)):null;

    // fetch references 
    result = await db.executeQuery("SELECT ref_name, contact_no, relation FROM `references` where candidate_id = " + candidate_id);
    candidate["references"] = result.length > 0?result.map(item=>Object.values(item)):null;

    // fetch preferences data
    candidate['preference'] = await db.executeQuery(`SELECT notice_period, current_ctc FROM preferances where candidate_id = ${candidate_id};`);

    return candidate;
}

module.exports = selectDataWithId;