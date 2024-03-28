const getData = async(url) => {
    let result = await fetch(url);
    return await result.json();
}

const fillOption = (id, options) =>{
    id = document.getElementById(id);
    id.innerHTML = "";
    options.forEach(option=>{
        id.innerHTML += `<option value=${option[0]}>${option[1]}</option>`;
    })
}

const load_page = async() => {
    let states = await getData("/state/");
    states = states.map(state=>[state.state_id, state.state_name]);
    fillOption("state", states);
}

const selectCity = async() => {
    document.getElementById("city").disabled = false;
    let state_id = document.getElementById("state").value;
    if(state_id == "select state")
    {
        document.getElementById("city").disabled = true;
        load_page();
        return;
    }
    let url = `/city/${state_id}`;
    let cities = await getData(url);
    cities = cities.map(city=>[city.city_id, city.city_name]);
    fillOption("city", cities);
}