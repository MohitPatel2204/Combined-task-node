let page = {
	hide: ["first", "0"],
	currentPageno: 0
}

const pagination = (operation, totalRecord, displayRecord, currentPageno) => {
	let end = Math.floor(totalRecord/displayRecord);

	switch(operation)
	{
		case "first":
			page.hide = [];
			page.hide = ["first", "0"]
			page.currentPageno = 0;
			break;
		case "last":
			page.hide = [];
			page.hide = ["last", "1"];
			page.currentPageno = end;
			break;
		case "1":
			if(page.currentPageno < end)
			{
				page.currentPageno++;
			}
			else
			{
				page.hide = [];
				page.hide = ["last", "1"];
				page.currentPageno = end;        
			}
			break;
		case "0":
			if(page.currentPageno > 0)
			{
				page.currentPageno--;
			}
			else
			{
				page.hide = ["first", "0"]
				page.currentPageno = 0;
			}
			break;
	}
	return page;
}

module.exports  = pagination;