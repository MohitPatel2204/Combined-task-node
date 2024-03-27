const isEmpty = (data) =>{
    let error = true;
    Object.keys(data).forEach((key)=>{
        if(data[key] == "")
        {
            error = key;
        }
    })
    return error;
}

module.exports = isEmpty;