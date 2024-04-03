const task1 = ((request, response)=>{
    response.render("html_ex/task1");
})

const task2 = ((request, response)=>{
    response.render("html_ex/task2");
})

const task3 = ((request, response)=>{
    response.render("html_ex/task3");
})

module.exports = {
    task1,
    task2,
    task3,
}