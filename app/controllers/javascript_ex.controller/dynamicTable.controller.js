const dynamicTable = ((request, response) => {
  try {
    response.render("javascript_ex/dynamictable")
  }
  catch {
    response.render("error");
  }
});

module.exports = dynamicTable;