const getCode = (length) => {
    const str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
    let code = "";
    for(let i=0; i<length; i++)
    {
        code += str.charAt(Math.floor(Math.random()*str.length));
    }
    return code;
}

const getDate = (date) => {
    let result = new Date().toLocaleDateString("en-US", {
        timeZone: process.env.TIME_ZONE,
    });
    return result;
}

const getDifferenceSeconds = (date1, date2) => {
    date1 = new Date(new Date(date1).toLocaleString("en-us", {
        timeZone: process.env.TIME_ZONE
    }));
    date2 = new Date(new Date(date2).toLocaleString("en-us", {
        timeZone: process.env.TIME_ZONE
    }));
    
    let diff = (date1 - date2)/1000;
    return diff;
}

module.exports = {
    getCode,
    getDate,
    getDifferenceSeconds
}