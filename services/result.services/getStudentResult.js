const database = require("../database");
const { queryFindStudent, queryFindStudentMark, queryFindAttendance, queryFindStudentFinalResult } = require("./query")

const getStudentResult = async(sid) =>{
    let result = {};
    try{
        const db = new database(process.env.DB_DATABASE);
        let student = await db.executeQuery(queryFindStudent(sid));
        result['student'] = student;
    
        let marks = await db.executeQuery(queryFindStudentMark(sid));
        result['marks'] = marks;
    
        let total = await db.executeQuery(queryFindStudentFinalResult(sid));
        result['total'] = total;
    
        let attendance = await db.executeQuery(queryFindAttendance(sid));
        result['attendance'] = attendance;
        return result;
    }
    catch (error){
        throw error;
    }
}

module.exports = getStudentResult;