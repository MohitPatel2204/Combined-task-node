const database = require("../database");

const getDate = (date) => {
    let arr = date.split("-");
    if(arr.length == 1)
    {
        arr = date.split("/")
    }
    return `${arr[2]}/${arr[1]}/${arr[0]}`;
}

const insertData = async(data) => {
    try{
        const db = new database(process.env.DB_DATABASE);
        
        let result = await db.insertData("candidates_master", {
            "first_name": data.firstname,
            "last_name": data.lastname,
            "designation": data.designation,
            "address1": data['address[]'][0],
            "address2": data['address[]'][1] == ""?null:data['address[]'][1],
            "email": data.email,
            "phoneno": data.phno,
            "state": data.state,
            "gender": data.gender=='male'?'m':'f',
            "relationship": data.relationshipstatus,
            "dob": getDate(data.dob),
            "expected_ctc": data.expectedctc,
            "prefered_location": data.preferedlocation.toString(),
            "department": data['department[]'],
            "city": data.city,
        });

        if(typeof result == "string")
        {
            return "ERROR : Data is already exist.....";
        }
        const candidateId = result.insertId;

        if(data.education!=null)
        {
            for(let i=0; i<data.education.length; i++) {
                let item = data.education[i];
                item['candidate_id'] = candidateId;
                result = await db.insertData("educations", item);
                if(typeof result == "string")
                {
                    return "Something is wrong, SSC Result is not stored...."+result;   
                }
            };
        }
        
        if(data.work!=null)
        {
            for(let i=0; i<data.work.length; i++) {
                let item = data.work[i];
                
                result = await db.insertData("work_experiences", {
                    candidate_id: candidateId,
                    company_name:item.company,
                    designation:item.designation,
                    from_date:getDate(item.form_date),
                    to_date: getDate(item.to_date),
                });
                if(typeof result == "string")
                {
                    return "Something is wrong, Duplicate work experiencess is not allowed....";   
                }
            }
        }
        const languages = [data.hindilanguage, data.englishlanguage, data.gujratilanguage];
        
        for(let i=0; i<languages.length; i++){
            let language = languages[i];
            if(language != null){
                for(let i=1; i<language.length; i++)
                {
                    let item = {
                        candidate_id: candidateId,
                        lan: language[0],
                        language_lvl: language[i]
                    }
                    result = await db.insertData("languages", item)
                    if(typeof result == "string")
                    {
                        return "Something is wrong, First reference experience is not stored....";   
                    }                
                }
            }
        }

        const technologies = [data.phpchk, data.oraclechk, data.mysqlchk, data.laravelchk];
        for(let i=0; i<technologies.length; i++){
            let technology = technologies[i];
            if(technology != null){
                result = await db.insertData("technologies", {
                    candidate_id: candidateId,
                    technology: technology[0],
                    tech_lvl: technology[1]
                })
                if(typeof result == "string")
                {
                    return "Something is wrong,Technology is not stored....";   
                }                
            }
        }   


        if(data.reference!=null)
        {
            for(let i=0; i<data.reference.length; i++) {
                let item = data.reference[i];
                item['candidate_id'] = candidateId;
                result = await db.insertData("`references`", {
                    candidate_id: item.candidate_id,
                    ref_name: item.ref_name,
                    contact_no: item.ref_contact,
                    relation: item.ref_relation,
                });
                if(typeof result == "string")
                {
                    return "Something is wrong, reference are not allwoed duplicate....";   
                }
            };
        }

        if(data.noticeperiod != undefined && data.currentctc != undefined)
        {
            result = await db.insertData("preferances", {
                candidate_id: candidateId,
                notice_period: data.noticeperiod,
                current_ctc: data.currentctc,
            })
            if(typeof result == "string")
            {
                return "Something is wrong, Second work notice period is not stored....";   
            }
        }
        return true;
    }
    catch{
        throw error;
    }
}

module.exports = insertData;