const isValidPost = (request, response, next) => {
    let data = request.body;
    let keys = Object.keys(data);
    let arr = [];

    keys.forEach(key => {
        switch(typeof data[key])
        {
            case 'string':
                if(data[key] == "")
                {
                    arr.push(key);
                }
                break;
            case 'object':
                if(Array.isArray(data[key]))
                {
                    if(data[key].length == 0)
                    {
                        arr.push(key);
                    }
                    for(let i=0; i<data[key].length; i++)
                    {
                        if(data[key][i] == "")
                        {
                            arr.push(key);
                            break;
                        }
                    }
                }
                else
                {
                    let obj=data[key]
                    let sub_keys = Object.keys(obj);
                    for(let i = 0; i<sub_keys.length; i++)
                    {
                        if(obj[sub_keys[i]] == "")
                        {
                            arr.push(key);
                            break;
                        }
                    }
                }
                break;
        }
    })

    if(arr.length == 0)
    {
        next();
    }
    else
    {
        response.send({
            flag: true,
            error: arr,
        })
    }
}

const isValidGet = (request, response, next) => {
    Object.keys(request.query).forEach(key=>{
        if(request.query[key] == null || request.query[key] == "")
        {
            response.send({flag: false, msg: `${key} value is invalid....`});
        }
    })
    next();
}

module.exports = {
    isValidPost,
    isValidGet
};