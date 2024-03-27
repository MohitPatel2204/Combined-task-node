let currentPage = 0;

const printData = (datatable,data,start, end) => {
    let body = document.querySelector(`#${datatable} tbody`);
    body.innerHTML = ""
    
    if(typeof data[0] == "string")
    {
        let tr = document.createElement("tr");
        tr.innerHTML = data;
        body.innerHTML = tr.innerHTML;
        return;
    }

    for(let i=start; i<end && i<data.length; i++)
    {
        let tr = document.createElement("tr");
        let keys = Object.keys(data[i]);
        for(let j=0; j<keys.length; j++)
        {
            let td = document.createElement("td");
            td.innerHTML = data[i][keys[j]];
            tr.appendChild(td);
        }
        body.appendChild(tr);
    }
}

const nextPagination = (data) => {
    if(currentPage < data.totalPage)
    {
        currentPage++;
        start = currentPage*data.displayRecord;
        end = Number(currentPage*data.displayRecord) + Number(data.displayRecord);
        printData(data['dataTableId'], data['data'], start, end);
        document.getElementById(data.buttonsID[0]).disabled = false;
        document.getElementById(data.buttonsID[1]).disabled = false;
    }
    if(currentPage == data.totalPage)
    {
        document.getElementById(data.buttonsID[2]).disabled = true;
        document.getElementById(data.buttonsID[3]).disabled = true;
    }
}

const lastPagination = (data)=>
{
    currentPage = data.totalPage;
    let start = (currentPage)*data.displayRecord;
    let end = data['data'].length;
    printData(data['dataTableId'], data['data'], start, end);
    document.getElementById(data.buttonsID[0]).disabled = false;
    document.getElementById(data.buttonsID[1]).disabled = false;
    document.getElementById(data.buttonsID[2]).disabled = true;
    document.getElementById(data.buttonsID[3]).disabled = true;
}

const previousPagination = (data) => {
    if(currentPage > 0)
    {
        currentPage--;
        let start = currentPage*data.displayRecord;
        let end = Number(currentPage*data.displayRecord) + Number(data.displayRecord);
        printData(data['dataTableId'],  data['data'], start, end);
        document.getElementById(data.buttonsID[2]).disabled = false;
        document.getElementById(data.buttonsID[3]).disabled = false;
    }
    if(currentPage == 0)
    {
        document.getElementById(data.buttonsID[0]).disabled = true;
        document.getElementById(data.buttonsID[1]).disabled = true;
    }
}

const firstPagination = (data) => {
    currentPage = 0;
    let start = 0;
    let end = data.displayRecord;
    printData(data['dataTableId'], data['data'], start, end);
    document.getElementById(data.buttonsID[0]).disabled = true;
    document.getElementById(data.buttonsID[1]).disabled = true;
    document.getElementById(data.buttonsID[2]).disabled = false;
    document.getElementById(data.buttonsID[3]).disabled = false;
}

const sortData = (data, key, type) => {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length - 1; j++) {
            if (data[j][key] > data[j + 1][key] && type == 0) {
                temp = data[j];
                data[j] = data[j + 1];
                data[j + 1] = temp;
            }
            if (data[j][key] < data[j + 1][key] && type == 1) {
                temp = data[j];
                data[j] = data[j + 1];
                data[j + 1] = temp;
            }
        }
    }
    return data;
}

const sort = (btn, grid) => {
    grid.data = sortData(grid.data, btn.id, btn.value);
    currentPage = 0;
    if(btn.value == 0)
        btn.value = 1;
    else    
        btn.value = 0;

    document.getElementById(grid.buttonsID[0]).disabled = true;
    document.getElementById(grid.buttonsID[1]).disabled = true;
    document.getElementById(grid.buttonsID[2]).disabled = false;
    document.getElementById(grid.buttonsID[3]).disabled = false;
    pagination(grid);
}



const createHeader = (data) => {
    if(typeof data.data[0] == "string")
    {
        return;
    }
    
    if(!data.header)
    {
        data["header"] = {}
        Object.keys(data.data[0]).forEach(key=>{
            data.header[key] = key;
        })
    }
    
    let head = document.querySelector(`#${data.dataTableId} thead`);
    head.innerHTML = "";

    let tr1 = document.createElement("tr");
    Object.keys(data.header).forEach(key=>{
        const th = document.createElement("th");
        th.innerHTML = data.header[key];
        th.value=0;
        th.id = key;
        th.setAttribute("onclick", "sort(this, obj)");
        tr1.appendChild(th);
    })
    // head.appendChild(tr);
    head.appendChild(tr1);
}

const pagination = (data, currentBtn) => {
    data["totalPage"] = Math.floor(data['data'].length / data.displayRecord);
    createHeader(data);
    if(data['data'].length <= data.displayRecord)
    {
        printData(data['dataTableId'], data['data'],0 , data.displayRecord);
        document.getElementById(data.buttonsID[0]).hidden = true;
        document.getElementById(data.buttonsID[1]).hidden = true;
        document.getElementById(data.buttonsID[2]).hidden = true;
        document.getElementById(data.buttonsID[3]).hidden = true;
        document.getElementById(data.printPageNo).hidden = true;
        return;
    }
    else
    {
        document.getElementById(data.buttonsID[0]).hidden = false;
        document.getElementById(data.buttonsID[1]).hidden = false;
        document.getElementById(data.buttonsID[2]).hidden = false;
        document.getElementById(data.buttonsID[3]).hidden = false;
        document.getElementById(data.printPageNo).hidden = false;
    }
    if(currentBtn)
    {
        switch(currentBtn.id)
        {
            case data.buttonsID[0]:
                firstPagination(data);
                break;
            case data.buttonsID[1]:
                previousPagination(data);
                break;
            case data.buttonsID[2]:
                nextPagination(data);
                break;
            case data.buttonsID[3]:
                lastPagination(data);
                break;
        }
    }
    else
    {
        printData(data['dataTableId'], data['data'],0 , data.displayRecord);
        document.getElementById(data.buttonsID[0]).disabled = true;
        document.getElementById(data.buttonsID[1]).disabled = true;
    }
    if(data.printPageNo)
        document.getElementById(data.printPageNo).innerHTML = currentPage+1;
}

const globalSearch = (obj, search) => {
    
    search = document.getElementById(search).value;
    if(search=="")
    {
        pagination(obj);
        return;
    }
    let res = [];
    let records = obj.data;
    let keys = Object.keys(records[0]);    
    records.forEach(record=>{
        for(let i=0; i<keys.length; i++)
        {
            if(record[keys[i]] == search)
            {
                res.push(record);
                break;
            }
        }
    })

    let obj1 = {
        dataTableId: obj.dataTableId,
        displayRecord: obj.displayRecord,
        data: res,
        printPageNo: obj.printPageNo,
        buttonsID: obj.buttonsID,
    }
    pagination(obj1);
}

let toggleFlag = false;
    const toggle = (id) => {
        if(toggleFlag)
        {
            document.getElementById(id).style.display = "none";
            toggleFlag = false;
        }
        else{
            document.getElementById(id).style.display = "table-cell";
            toggleFlag = true;
        }
    }

    const searchAll = (grid) => {
        let fields = document.querySelector(`#${grid.dataTableId} #inputs`).children
        let conditions = {};
        let operationType = fields[fields.length-3].value;

        for(let i=0; i<fields.length-3; i++)
        {
            if(fields[i].value != "")
            {
                conditions[fields[i].id] = fields[i].value;
            }
        }
        if(conditions != {})
        {
            // let data = grid.data
            let res = [];
            if(operationType == "and")
            {
                grid.data.forEach(item => {
                    count = 0;
                    Object.keys(conditions).forEach(key=>{
                        if(conditions[key] == item[key]){
                            count++;
                        }
                    })
                    if(count == Object.keys(conditions).length)
                        res.push(item);
                });
            }
            else
            {
                keys = Object.keys(conditions)
                data.forEach(item => {
                    for(let i=0; i<keys.length; i++)
                    {
                        if(conditions[keys[i]] == item[keys[i]])
                        {
                            res.push(item);
                            break;
                        }
                    }
                });
            }
            let table = {...grid};
            table.data = res;

            document.getElementById(grid.buttonsID[0]).disabled = true;
            document.getElementById(grid.buttonsID[1]).disabled = true;
            document.getElementById(grid.buttonsID[2]).disabled = false;
            document.getElementById(grid.buttonsID[3]).disabled = false;
            pagination(table);
        }   
        else
        {
            pagination(grid);
        }
    }

    const clearData = (grid) => {
        document.getElementById(grid.buttonsID[0]).disabled = true;
        document.getElementById(grid.buttonsID[1]).disabled = true;
        document.getElementById(grid.buttonsID[2]).disabled = false;
        document.getElementById(grid.buttonsID[3]).disabled = false;
        let fields = document.querySelector(`#${grid.dataTableId} #inputs`).children

        for(let i=0; i<fields.length-3; i++)
        {
            fields[i].value = ""
        }

        pagination(grid);
    }
