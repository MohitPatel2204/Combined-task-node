const database = require('../../../services/database');

const candidateUpdateGet = ((request, response) => {
    response.render("job_app_ajax/form");
})

const candidateUpdatePost = (async (request, response) => {
    const candidateId = request.params.id;
    const db = new database(process.env.DB_DATABASE);
    try {
        let result = await db.updateData("candidate_masters1", request.body.candidate_masters, { id: candidateId });
        if (typeof result == 'string') {
            response.send({ error: `Something is wrong ${result}` });
        }


        const education_details = request.body.education_details;
        result = await db.executeQuery("select * from education_details1 where candidate_id = ?", [candidateId]);
        if (typeof result == 'string')
            response.send({ error: `Something is wrong ${result}` });

        let values = education_details.map(item => item.id);
        let sql = "delete from education_details1 where id not in (?) and candidate_id = ?";
        values = values.filter((value, index) => values.indexOf(value) == index)

        result = await db.executeQuery(sql, [values.toString(), candidateId]);
        if (typeof result == 'string')
            response.send({ error: `Something is wrong ${result}` });

        for (let i = 0; i < education_details.length; i++) {
            let item = education_details[i];
            delete item.id;
            result = await db.updateData("education_details1", item, {
                candidate_id: candidateId,
                course: item.course,
            })
            if (typeof result == 'string')
                response.send({ error: `Something is wrong ${result}` });

            if (result.affectedRows == 0) {
                item['candidate_id'] = candidateId;
                result = await db.insertData("education_details1", item)
                if (typeof result == 'string')
                    response.send({ error: `Something is wrong ${result}` });
            }
        }

        let work_experiences = request.body.work_experiences;
        result = await db.executeQuery("select * from work_experiences1 where candidate_id = ?", [candidateId]);
        if (typeof result == 'string')
            response.send({ error: `Something is wrong ${result}` });

        values = work_experiences.map(item => item.id);
        sql = "delete from work_experiences1 where id not in (?) and candidate_id = ?";
        values = values.filter((value, index) => values.indexOf(value) == index)

        result = await db.executeQuery(sql, [values.toString(), candidateId]);
        if (typeof result == 'string')
            response.send({ error: `Something is wrong ${result}` });


        work_experiences.forEach(async item => {
            delete item.id;
            result = await db.updateData("work_experiences1", item, {
                candidate_id: candidateId,
                company_name: item.company_name
            })
            if (typeof result == 'string')
                response.send({ error: `Something is wrong ${result}` });

            if (result.affectedRows == 0) {
                item['candidate_id'] = candidateId;
                result = await db.insertData("work_experiences1", item)
                if (typeof result == 'string')
                    response.send({ error: `Something is wrong ${result}` });
            }
        });

        let languages = request.body.languages;
        result = await db.executeQuery("select * from languages1 where candidate_id = ?", [candidateId]);
        if (typeof result == 'string')
            response.send({ error: `Something is wrong ${result}` });

        values = work_experiences.map(item => item.id);
        sql = "delete from languages1 where id not in (?) and candidate_id = ?";
        values = values.filter((value, index) => values.indexOf(value) == index)

        result = await db.executeQuery(sql, [values.toString(), candidateId]);
        if (typeof result == 'string')
            response.send({ error: `Something is wrong ${result}` });

        languages.forEach(async item => {
            result = await db.updateData("languages1", item, {
                candidate_id: candidateId,
                language: item.language
            })
            if (typeof result == 'string')
                response.send({ error: `Something is wrong ${result}` });

            if (result.affectedRows == 0) {
                item['candidate_id'] = candidateId;
                result = await db.insertData("languages1", item)
                if (typeof result == 'string')
                    response.send({ error: `Something is wrong ${result}` });
            }
        });

        let technologies = request.body.technologies;
        result = await db.executeQuery("select * from technologies1 where candidate_id = ?", [candidateId]);
        if (typeof result == 'string')
            response.send({ error: `Something is wrong ${result}` });

        values = work_experiences.map(item => item.id);
        sql = "delete from technologies1 where id not in (?) and candidate_id = ?";
        values = values.filter((value, index) => values.indexOf(value) == index)

        result = await db.executeQuery(sql, [values.toString(), candidateId]);
        if (typeof result == 'string')
            response.send({ error: `Something is wrong ${result}` });

        technologies.forEach(async item => {
            result = await db.updateData("technologies1", item, {
                candidate_id: candidateId,
                technology: item.technology
            })
            if (typeof result == 'string')
                response.send({ error: `Something is wrong ${result}` });

            if (result.affectedRows == 0) {
                item['candidate_id'] = candidateId;
                result = await db.insertData("technologies1", item)
                if (typeof result == 'string')
                    response.send({ error: `Something is wrong ${result}` });
            }
        });


        const reference_contacts = request.body.reference_contacts;
        result = await db.executeQuery("select * from reference_contacts1 where candidate_id = ?", [candidateId]);
        if (typeof result == 'string')
            response.send({ error: `Something is wrong ${result}` });

        values = work_experiences.map(item => item.id);
        sql = "delete from reference_contacts1 where id not in (?) and candidate_id = ?";
        values = values.filter((value, index) => values.indexOf(value) == index)

        result = await db.executeQuery(sql, [values.toString(), candidateId]);
        if (typeof result == 'string')
            response.send({ error: `Something is wrong ${result}` });

        reference_contacts.forEach(async item => {
            result = await db.updateData("reference_contacts1", item, {
                candidate_id: candidateId,
                name: item.name
            })
            if (typeof result == 'string')
                response.send({ error: `Something is wrong ${result}` });

            if (result.affectedRows == 0) {
                item['candidate_id'] = candidateId;
                result = await db.insertData("reference_contacts1", item)
                if (typeof result == 'string')
                    response.send({ error: `Something is wrong ${result}` });
            }
        });

        response.send({ error: "Data is updated" })
    }
    catch {
        response.send({
            error: "Server side error, Please restart your application..."
        })
    }
})

module.exports = {
    candidateUpdateGet,
    candidateUpdatePost
};