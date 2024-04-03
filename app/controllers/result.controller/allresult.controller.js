const database = require("../../../services/database");
const { resultAll } = require("../../../services/result.services/query");

const allresult = (async(request, response)=>{
    try{
        const db = new database(process.env.DB_DATABASE);
        let result = await  db.executeQuery(resultAll);
        let fields = {
            sid: "Student ID",
            name: "Student Name",
            Total_prilium_theory: "Total Prilium Theory Marks",
            Total_prilium_practical: "Total Prilium Practical Marks",
            Total_terminal_theory: "Total Terminal Theory Marks",
            Total_terminal_practical: "Total Terminal Practical Marks",
            Total_final_theory: "Total Final Theory Marks",
            Total_final_practical: "Total Final Practical Marks",
            Total: "Total Marks",
            view: "View"
        }
        response.render("result/allresult", {result, fields});
    }
    catch{
        response.render("error");
    }
})

module.exports = allresult;