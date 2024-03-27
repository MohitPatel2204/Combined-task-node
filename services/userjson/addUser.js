const fs = require("fs");
const path = require("path");
const getData = require("./getData");

const addUser = (user) =>{
    let saveDir = path.join(__dirname, "../../data");
    if(!fs.existsSync(saveDir))
    {
        try{
            fs.mkdirSync(saveDir);
        }
        catch(error){ 
            return error;
        }
    }
    
    let file = "user.json";
    let index = 0;
    let result = {};
    if(!fs.existsSync(path.join(saveDir, file)))
    {
        result["index"] = index;
        result[index] = user;
    }
    else
    {
        try
        {
            result = getData();
            if(result)
            {
                result["index"]++;
                result[result["index"]] = user;
            }
        }
        catch(error)
        {
            throw error;
            // console.log(error);
        }
    }
    
    // write file
    fs.writeFileSync(path.join(saveDir, file), JSON.stringify(result), error=>{
        if(error)
            throw error;
    }) 
    return true; 
}

module.exports = addUser;
