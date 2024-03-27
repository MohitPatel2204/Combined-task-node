const createHeader = grid => {
    if (Object.keys(grid).indexOf("header") < 0) {
        let fields = {};
        for (let key in grid.data[0]) { fields[key] = key }
        grid.header = fields;
    }
    grid.header["operations"] = "Operations";

    let hedaer = document.querySelector(`#${grid.parentNode} #${grid.name} #header`);
    let tr = document.createElement("tr");

    Object.keys(grid.header).forEach(key => {
        let th = document.createElement("th");
        th.innerHTML = grid.header[`${key}`];
        th.style.cursor = "pointer";
        th.addEventListener("click", () => {
            grid.data = sort(grid.data, key, "a")
            createGrid(grid);
        })
        tr.appendChild(th);
    })
    hedaer.appendChild(tr);
    return grid;
}



const createBody = (grid) => {
    let body = document.querySelector(`#${grid.parentNode} #${grid.name} #body`);
    body.innerHTML = "";
    let start = grid.current * grid.displayRecord;
    let end = start + grid.displayRecord;

    for (let i = start; i < end && i < grid.data.length; i++) {
        let item = grid.data[i];
        let tr = document.createElement("tr");
        for (let key in grid.header) {
            let td = document.createElement("td");
            if(key == "operations")
            {
                td.innerHTML = `<a href = "/post/${item.id}">View More</a>`;
            }
            else
            {
                td.innerHTML = item[key];
            }
            tr.appendChild(td);
        }
        body.appendChild(tr);
    }
}

const pagination = (grid, operation) => {
    const buttons = document.querySelector(`#${grid.parentNode} #${grid.name} #footer tr td div`).children;
    let totalPage = Math.ceil(grid.data.length / grid.displayRecord) - 1;

    switch (operation) {
        case 0:
            buttons[0].disabled = true;
            buttons[1].disabled = true;
            buttons[3].disabled = false;
            buttons[4].disabled = false;
            grid.current = 0;
            break;
        case 1:
            buttons[3].disabled = false;
            buttons[4].disabled = false;
            grid.current--;
            if (grid.current == 0) {
                buttons[0].disabled = true;
                buttons[1].disabled = true;
            }
            break;
        case 3:
            buttons[0].disabled = false;
            buttons[1].disabled = false;
            grid.current++;
            if (grid.current >= totalPage) {
                buttons[3].disabled = true;
                buttons[4].disabled = true;
            }
            break;
        case 4:
            buttons[0].disabled = false;
            buttons[1].disabled = false;
            buttons[3].disabled = true;
            buttons[4].disabled = true;
            grid.current = totalPage;
            break;
    }
    return grid;
}

const createFooter = (grid) => {
    let footer = document.querySelector(`#${grid.parentNode} #${grid.name} #footer`);

    let tr = document.createElement("tr");
    let td = document.createElement("td");

    td.colSpan = Object.keys(grid.header).length;
    td.style.textAlign = "center";

    let div = document.createElement("div");
    div.style.display = "flex";
    div.style.gap = "10px"
    div.style.width = "fit-content";
    div.style.margin = "auto";

    let btn = document.createElement("button");
    btn.id = "first";
    btn.disabled = true;
    btn.innerHTML = "&#10094;&#10094";
    div.appendChild(btn);

    btn = document.createElement("button");
    btn.id = "prev";
    btn.disabled = true;
    btn.innerHTML = "&#10094;";
    div.appendChild(btn);

    p = document.createElement("p")
    p.id = "page";
    p.innerHTML = grid.current + 1;
    div.appendChild(p);

    btn = document.createElement("button")
    btn.id = "next";
    btn.innerHTML = "&#10095;";
    div.appendChild(btn);

    btn = document.createElement("button");
    btn.id = "last"
    btn.innerHTML = "&#10095;&#10095;";
    div.appendChild(btn);

    td.appendChild(div);
    tr.appendChild(td);
    footer.appendChild(tr);

    buttons = document.querySelector(`#${grid.parentNode} #${grid.name} #footer tr td div`).children;
    // buttons = td.childNodes;
    for (let i = 0; i < buttons.length; i++) {
        if (i != 2) {
            buttons[i].addEventListener("click", () => {
                grid = pagination(grid, i);
                createBody(grid);
                document.querySelector(`#${grid.parentNode} #${grid.name} #footer tr td div p`).innerHTML = grid.current + 1;
            })
        }
    }
}

const createTable = (grid) => {
    const table = document.createElement("table");
    table.id = grid.name;

    const thead = document.createElement("thead");
    thead.id = "header";

    const tbody = document.createElement("tbody");
    tbody.id = "body";

    const tfoot = document.createElement("tfoot");
    tfoot.id = "footer";

    table.appendChild(thead);
    table.appendChild(tbody);
    table.appendChild(tfoot);

    document.querySelector(`#${grid.parentNode}`).innerHTML = "";
    document.querySelector(`#${grid.parentNode}`).appendChild(table);
}

const createGrid = (grid) => {
    if (grid.data.length > 0) {
        grid["current"] = 0;
        grid["pagination"] = (grid.data.length > grid.displayRecord);

        createTable(grid);
        grid = createHeader(grid);
        createBody(grid);
        createFooter(grid);
    }
}

const sort = (arr, key, type) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j][key] > arr[j + 1][key] && type == 'a') {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
            // if (arr[j][key] < arr[j + 1][key] && type == 'd') {
            //     let temp = arr[j];
            //     arr[j] = arr[j + 1];
            //     arr[j + 1] = temp;
            // }
        }
    }
    return arr;
}