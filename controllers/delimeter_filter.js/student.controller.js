const express = require("express");
const database = require("../../services/database");

const student = express.Router();

const splitExpression = (exp) => {
    const res = {
        fname: [],
        lname: [],
        email: [],
        gender: [],
        mobileno: [],
        city: []
    }

    let symbol = ["_", "^", "$", "}", "{", "#"];
    let char;
    let array = [];
    let str = ""
    for(let i=0; i<exp.length; i++)
    {
        if(symbol.indexOf(exp[i])>=0)
        {
            array.push(str);
            array.push(exp[i]);
            str="";
        }
        else
        {
            str += exp[i];
        }
    }
    array.push(str)
    array = array.slice(1, array.length)
    
    for(let i=0; i<array.length; i+=2)
    {
        switch(array[i])
        {
            case "_":
                res.fname.push(array[i+1]);
                break;
            case "^":
                res.lname.push(array[i+1]);
                break;
            case "$":
                res.email.push(array[i+1]);
                break;
            case "}":
                res.gender.push(array[i+1]);
                break;
            case "{":
                res.mobileno.push(array[i+1]);
                break;
            case "#":
                res.city.push(array[i+1]);
                break;
        }
    }

    return res;
}

student.get("/student/delimeter", async(request, response)=>{
    const db = new database(process.env.DB_DATABASE);
    let query = "select * from student"
    let exp = "";
    if(request.query.expression)
    {
        exp = request.query.expression;
        let conditions = splitExpression(exp);
    
        if(conditions != {})
        {
            query += " where ";
            let keys = Object.keys(conditions);
            count = 0;
            keys.forEach(key =>{
                for(let i = 0; i<conditions[key].length; i++)
                {
                    if(i==0)
                    {
                        query += "(";
                    }
                    query += `${key} like '%${conditions[key][i]}%' or `
                    count++;
                }
                if(count > 0)
                {
                    query = query.slice(0, query.length-4) + ") and ";
                    count = 0;
                }
            })
            query = query.slice(0, query.length-5);
        }
    }
    
    let result = await db.executeQuery(query);
    let table = {
        name: "table1",
        data: result,
        displayRecord: 21
    }
    response.render("delimeter_filter/student", {table, exp});
})

module.exports = student;



//_Aili_Gale^Marden$Aili.Marden@gmail.com}m{6106120618#Ambon_Shirlee