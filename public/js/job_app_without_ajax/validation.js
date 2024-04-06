const isRequiredString = (obj) =>{
    keys = Object.keys(obj);
    let error = [];
    for(let i=0; i<keys.length; i++)
    {
        if(document.getElementById(keys[i]).value.trim()=="")
        {
            error.push(keys[i]);
        }
    }
    return error;
}

const isNumberString = (obj) =>{
    let error = [];
    let keys = Object.keys(obj);
    for(let i=0; i<keys.length; i++)
    {
        if(!isNaN(document.getElementById(keys[i]).value.trim()))
        {
            error.push(keys[i]);
        }
    }
    return error;
}

const regularExp = (type, id) => {
    let EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let CONTACT =  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    let DATE = "(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[1,2])\/(19|20)\d{2}";
    switch(type)
    {
        case "email":
            if(EMAIL.test(document.getElementById(id).value))
                return true;
            break;
        case "mobile":
            if(CONTACT.test(document.getElementById(id).value))
                return true;
            break;
        case "date":
            if(DATE.test(document.getElementById(id).value))
                return true;
            break;
    }
    return id;
}

const arrayRequired = (arr) => {
    let error = [];
    for(let i=0; i<arr.length; i++)
    {
        let obj = arr[i];
        let inputs = document.getElementsByName(obj.name);
        let count = 0;
        if(obj.type=="text")
        {
            inputs.forEach(input=>{
                if(input.value.trim() != "")
                    count++;
            })
        }
        else
        {
            inputs.forEach(input=>{
                if(input.checked == true)
                    count++;
            })
        }
        if(obj.required == true && count >= obj.size) 
            continue;
        else if(obj.required==false && (count == 0 || obj.size <= count))
        {
            continue;
        } 
        else
        {
            error.push(obj);
        }
    }
    return error;
}
const isArraySame = (arr) => {
    let error = [];

    for(let i=0; i<arr.length; i++)
    {
        let obj = arr[i];
        let result = []
        obj.data.forEach(item=>{
            item = document.getElementsByName(item)
            let row = [];
            item.forEach(element => {
                if(element.value.trim() != "")
                    row.push(element.value.trim())
            });
            result.push(row);
        })
        let size = result[0].length;
        for(let i=0; i<result.length; i++)
        {
            if(size != result[i].length)
                error.push(obj);
        }
    }
    return error;
}

const printErrorMessage = (id, msg) => {
    let node = document.getElementsByName(id)[0].parentNode;
    node.innerHTML += `<span class='text-danger'>${msg}</span>`;
}

const removeErrorMessage = () => {
    const errors = document.querySelectorAll('span.text-danger')
    errors.forEach(error=>error.remove())
}

const isValidate = () => {
    removeErrorMessage();
    let errorArray = [];

    // required string or no
    let requiredStr = {
        firstname: "First name",
        lastname: "Last name",
        designation: "Designation",
        email : "Email ID", 
        phno: "Mobile number", 
        dob: "Birthdate",
        expectedctc: "Excepted CTC"
    }
    let result = isRequiredString(requiredStr);
    result.forEach(item=>{
        if(errorArray.indexOf(item)<0)
            errorArray.push(item);
    })

    // // check number string
    let obj = {
        firstname: "First name",
        lastname: "Last name",
        designation: "Designation",
    }
    result = isNumberString(obj);
    result.forEach(item=>{
        if(errorArray.indexOf(item)<0)
            errorArray.push(item);
    })
    
    // // is regex or not 
    if(regularExp("email", "email")!=true)
    {
        if(errorArray.indexOf('email')<0)   
            errorArray.push('email')
    }
    else if(regularExp("mobile", "phno")!=true)
    {
        if(errorArray.indexOf('phno')<0)   
            errorArray.push('phno')
    }
    else if(regularExp("date", "dob")!=true)
    {
        if(errorArray.indexOf('dob')<0)   
            errorArray.push('dob')
    } 

    //---language known 
    obj = [
        {
            name: "hindilanguage[]",
            size: 2,
            type: "select",
            required: false
        },
        {
            name: "englishlanguage[]",
            size: 2,
            type: "select",
            required: false
        },
        {
            name: "gujratilanguage[]",
            size: 2,
            type: "select",
            required: false
        },
        {
            name: "phpchk[]",
            size: 2,
            type: "select",
            required: false
        },
        {
            name: "oraclechk[]",
            size: 2,
            type: "select",
            required: false
        },
        {
            name: "mysqlchk[]",
            size: 2,
            type: "select",
            required: false
        },
        {
            name: "laravelchk[]",
            size: 2,
            type: "select",
            required: false
        },
    ]
    result = arrayRequired(obj);
    result = result.map(item=>item.name)
    result.forEach(item=>{
        if(errorArray.indexOf(item)<0)
            errorArray.push(item);
    })

    let obj1 = [
        {
            label: "Education",
            data: ['coursename[]', 'board[]', 'passingyear[]', 'percentage[]'],
            require: false
        },
        {
            label: "Work Experience",
            data: ['companyname[]', 'work_designation[]', 'form_date[]', 'to_date[]'],
            require: false
        },
        {
            label: "References",
            data: ['ref_name[]', 'ref_contact[]', 'ref_relation[]'],
            require: false
        },
    ]
    result = isArraySame(obj1);
    result = result.map(item=>item.data[0])
    result.forEach(item=>{
        if(errorArray.indexOf(item)<0)
            errorArray.push(item);
    })

    if(errorArray.length > 0)
    {
        document.getElementsByName(errorArray[0])[0].focus();
        errorArray.forEach(item=>{
            printErrorMessage(item, `${item} invalid...`)
        })
        return false;
    }
    return true;
}

