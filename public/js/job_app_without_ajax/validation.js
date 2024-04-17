const isRequiredString = (obj) =>{
    keys = Object.keys(obj);
    for(let i=0; i<keys.length; i++)
    {
        if(document.getElementById(keys[i]).value.trim()=="")
        {
            return keys[i];
        }
    }
    return true;
}

const isNumberString = (obj) =>{
    let keys = Object.keys(obj);
    for(let i=0; i<keys.length; i++)
    {
        if(!isNaN(document.getElementById(keys[i]).value.trim()))
        {
            return keys[i];
        }
    }
    return true;
}

const regularExp = (type, id) => {
    let EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let CONTACT =  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    let DATE = "(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[1,2])\/(19|20)\d{2}";
    switch(type)
    {
        case "email":
            if(EMAIL.matched(document.getElementById(id).value.trim()))
                return true;
            break;
        case "mobile":
            if(CONTACT.match(document.getElementById(id).value.trim()))
                return true;
            break;
        case "date":
            if(DATE.match(document.getElementById(id).value.trim()))
                return true;
            break;
    }
    return id;
}

const arrayRequired = (arr) => {
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
            return obj;
        }
    }
    return true;
}
const isArraySame = (arr) => {
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
                return obj;
        }
    }
    return true;
}

const isValidate = () => {
<<<<<<< HEAD
    removeErrorMessage();
    let errorArray = {};

    // required string or no
=======
    console.log("1")
    let errorMessage = document.getElementById("error_message")
>>>>>>> parent of eb6c9e2 (Job application without ajax client side validation modified....)
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
<<<<<<< HEAD
    result.forEach(item=>{
        if(Object.keys(errorArray).indexOf(item)<0)
            errorArray[item] = `${item} is required...`;
    })

    // check number string
    let obj = {
        firstname: "First name",
        lastname: "Last name",
        designation: "Designation",
    }
    result = isNumberString(obj);
    result.forEach(item=>{
        if(Object.keys(errorArray).indexOf(item)<0)
            errorArray[item] = `${item} is number us not valid`;
    })
    
    // // is regex or not 
    if(regularExp("email", "email")!=true)
    {
        if(Object.keys(errorArray).indexOf('email')<0)   
            errorArray['email'] = `email id is invalid...`;
    }
    else if(regularExp("mobile", "phno")!=true)
    {
        if(Object.keys(errorArray).indexOf('phno')<0)   
            errorArray['phno'] = `phone number is invalid...`
    }
    else if(regularExp("date", "dob")!=true)
    {
        if(Object.keys(errorArray).indexOf('dob')<0)   
            errorArray['dob'] = 'birthdate is invalid....'
    } 
=======
    if(result == true)
    {
        let obj = {
            firstname: "First name",
            lastname: "Last name",
            designation: "Designation",
        }

        let result = isNumberString(obj);
        if(result != true)
        {   
            document.getElementById(result).focus();
            errorMessage.hidden = false;
            errorMessage.innerHTML = `ERRRO : Please, Enter valid ${obj[result]}`;
            return false;
        }
>>>>>>> parent of eb6c9e2 (Job application without ajax client side validation modified....)

        if(regularExp("email", "email")!=true)
        {
            errorMessage.hidden = false;
            errorMessage.innerHTML = `ERRRO : Please, Enter valid email ID`;
            return false;
        }
        else if(regularExp("mobile", "phno")!=true)
        {
            errorMessage.hidden = false;
            errorMessage.innerHTML = `ERRRO : Please, Enter valid mobileno`;
            return false;
        }
        else if(regularExp("date", "dob")!=true)
        {
            errorMessage.hidden = false;
            errorMessage.innerHTML = `ERRRO : Please, Enter valid date`;
            return false;
        }
    }
    else
    {
        document.getElementById(result).focus();
        errorMessage.hidden = false;
        errorMessage.innerHTML = `ERROR: Please, Enter ${requiredStr[result]}`;
        return false;
    }

    let obj = [
        {
            name: "hindilanguage[]",
            label: "Hindi language",
            size: 2,
            type: "select",
            required: false
        },
        {
            name: "englishlanguage[]",
            label: "English language",
            size: 2,
            type: "select",
            required: false
        },
        {
            name: "gujratilanguage[]",
            label: "Gujrati language",
            size: 2,
            type: "select",
            required: false
        },
        {
            name: "phpchk[]",
            label: "PHP language",
            size: 2,
            type: "select",
            required: false
        },
        {
            name: "oraclechk[]",
            label: "Oracle language",
            size: 2,
            type: "select",
            required: false
        },
        {
            name: "mysqlchk[]",
            label: "Mysql language",
            size: 2,
            type: "select",
            required: false
        },
        {
            name: "laravelchk[]",
            label: "Laravel language",
            size: 2,
            type: "select",
            required: false
        },
    ]
    result = arrayRequired(obj);
<<<<<<< HEAD
    result = result.map(item=>item.name)
    result.forEach(item=>{
        if(Object.keys(errorArray).indexOf(item)<0)
            errorArray[item] = `${item} is selection is invalid...`;
    })
=======

    if(result != true)
    {
        document.getElementsByName(result.name)[0].focus();
        errorMessage.hidden = false;
        errorMessage.innerHTML = `ERROR: Please, Enter ${result.label}`;
        return false;
    }
>>>>>>> parent of eb6c9e2 (Job application without ajax client side validation modified....)

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
<<<<<<< HEAD
    result = isArraySame(obj1);
    result = result.map(item=>item.data[0])
    result.forEach(item=>{
        if(Object.keys(errorArray).indexOf(item)<0)
            errorArray[item] = `${item} all field is required...`;
    })

    if(Object.keys(errorArray).length > 0)
    {
        Object.keys(errorArray).forEach(item=>{
            printErrorMessage(item, errorArray[item])
        })
=======

    result = isArraySame(obj1);
    if(result!=true)
    {
        document.getElementsByName(result.data[0])[0].focus();
        errorMessage.hidden = false;
        errorMessage.innerHTML = `ERROR: Please, Enter ${result.label}`;
>>>>>>> parent of eb6c9e2 (Job application without ajax client side validation modified....)
        return false;
    }

    return true;
}

