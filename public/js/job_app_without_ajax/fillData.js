const displayTextData = (obj) => {
    let nodes = Object.keys(obj).map(item => document.getElementsByName(item)[0]);
    let keys = Object.keys(obj);
    nodes.forEach((node, count) => {
        switch (node.type) {
            case 'text':
            case 'number':
            case 'hidden':
                node.value = obj[keys[count]];
                break;
            case 'select-one':
            case 'select-multiple':
                let options = Object.values(node.options);
                let selected = [...obj[keys[count]]]
                if (node.type == 'select-one')
                    selected = [obj[keys[count]]]
                options.forEach(option => {
                    if (selected.indexOf(option.value) >= 0)
                        option.selected = true;
                })
                break;
        }
    })

}

const displayArrayData = (obj) => {
    let nodes = Object.keys(obj).map(item => document.getElementsByName(item));
    let keys = Object.keys(obj);

    nodes.forEach((node, count) => {
        let selected = typeof obj[keys[count]] == 'object' ? [...obj[keys[count]]] : [obj[keys[count]]];

        node.forEach((item, selectedCount) => {
            switch (item.type) {
                case 'radio':
                case 'checkbox':
                    if (selected.indexOf(item.value) >= 0)
                        item.checked = "true";
                    break;
                default:
                    item.value = selected[selectedCount];
            }
        })
    })
}

const mdArrayToObject = (arr) => {
    let obj = {};

    arr.forEach(row => {
        row.forEach((cell, count) => {
            if (count == 0 && Object.keys(obj).indexOf(cell) == -1)
                obj[cell] = [cell];
            else if (count > 0)
                obj[row[0]].push(cell);
        })
    })

    return obj;
}

const displayMdArrayData = (arr) => {
    arr.forEach(obj => {
        nodes = obj.nodes.map(node => document.getElementsByName(node))
        data = obj.data;
        for (let i = 0; i < data.length; i++) {
            createObject(obj.genrateId, data.length + 1);
        }
        for (let i = 0; i < nodes.length; i++) {
            for (let j = 0; j < nodes[i].length; j++) {
                switch (nodes[i][j].type) {
                    case 'select-one':
                    case 'select-multiple':
                        let selected = typeof data[j][i] == 'object' ? data[j][i] : [data[j][i]];
                        let options = Object.values(nodes[i][j].options);
                        options.forEach(option => {
                            if (selected.indexOf(option.value) >= 0)
                                option.selected = true;
                        })
                        break;
                    default:
                        nodes[i][j].value = data[j][i];
                }

            }
        }
    })
}

const display = () => {
    let candidate_id = window.location.href.split("/").pop();
    let url = `/job_app_without_ajax/fetch/${candidate_id}`;
    fetch(url).then(response => response.json()).then(candidate => {
        if (candidate.error) {
            window.location.href = "*";
            return;
        }
        const basic_details = candidate.basic;
        const education = candidate.education;
        const language = mdArrayToObject(candidate.language);
        const technology = mdArrayToObject(candidate.technology);
        const work = candidate.work;
        const references = candidate.references;
        const preference = candidate.preference[0];

        let obj1 = {
            candidate_id: basic_details.candidate_id,
            firstname: basic_details.first_name,
            lastname: basic_details.last_name,
            designation: basic_details.designation,
            email: basic_details.email,
            phno: basic_details.phoneno,
            relationshipstatus: basic_details.relationship,
            dob: basic_details.dob,
            state: basic_details.state,
            city: basic_details.city,
            expectedctc: basic_details.expected_ctc,
            noticeperiod: preference.notice_period,
            currentctc: preference.current_ctc,
            preferedlocation: basic_details.prefered_location,
            "department[]": basic_details.department,
        }
        displayTextData(obj1);

        obj1 = {
            gender: basic_details.gender == 'm' ? "male" : "female",
            "address[]": [basic_details.address1, basic_details.address2],
            "hindilanguage[]": language.hindi,
            "englishlanguage[]": language.english,
            "gujratilanguage[]": language.gujrati,
            "phpchk[]": technology.php,
            "oraclechk[]": technology.oracle,
            "mysqlchk[]": technology.mysql,
            "laravelchk[]": technology.laravel
        }
        displayArrayData(obj1);

        obj1 = [
            {
                nodes: ["coursename[]", "board[]", "passingyear[]", 'percentage[]'],
                data: education,
                genrateId: 'addeducation'
            },
            {
                nodes: ['companyname[]', 'work_designation[]', 'form_date[]', 'to_date[]'],
                data: work,
                genrateId: 'addwork'
            },
            {
                nodes: ['ref_name[]', 'ref_contact[]', 'ref_relation[]'],
                data: references,
                genrateId: 'addreference'
            },
        ]
        displayMdArrayData(obj1);
    })
}