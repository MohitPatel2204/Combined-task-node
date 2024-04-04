const modifyData = async() => {
    let url;
    if(document.getElementById("candidate_id").value == "")
    {
        url = "/job_app_ajax/insert_candidate"
    }
    else
    {
        url = `/job_app_ajax/update_candidate/${document.getElementById("candidate_id").value}`;
    }
    const data = new URLSearchParams(new FormData(document.getElementById("job_app_form")));
    console.log(url)
    let result = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
        }
    })
    result = await result.json();
    displayError(result.error);
}