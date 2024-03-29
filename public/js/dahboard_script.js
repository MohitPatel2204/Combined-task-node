// let hide_navigation_count = 1;
let decrease_width_count = 1;
function decrease_width() {
    if (decrease_width_count == 1) {
        let links = document.getElementsByClassName("nav-item-content");
        for (let link of links) {
            link.style.display = "none";
        }
        document.getElementById("menubar").removeAttribute("class");
        document.getElementById("menubar").setAttribute("class", "col-1");
        document.getElementById("genral").style.display = "none";
        document.getElementById("content").removeAttribute("class");
        document.getElementById("content").setAttribute("class", "col-11");
        decrease_width_count = 0;
    }
    else {
        let links = document.getElementsByClassName("nav-item-content");
        for (let link of links) {
            link.style.display = "block";
        }
        document.getElementById("menubar").removeAttribute("class");
        document.getElementById("menubar").setAttribute("class", "col-2");
        document.getElementById("genral").style.display = "block";
        document.getElementById("content").removeAttribute("class");
        document.getElementById("content").setAttribute("class", "col-10");
        decrease_width_count = 1;
    }

}