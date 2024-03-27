const env = fetch('/clientEnvVariable/').then(async response => {
    return await response.json();
})

const global = {
    "env":{},
}
Promise.all([env]).then(values=>{
    global.env = values[0];
    return global;
})

const errorGenrate = (id, msg) => {
    const parent = document.getElementById(id).parentNode;
    if (parent.children[parent.children.length - 1].tagName == 'P') {
        parent.children[parent.children.length - 1].remove();
    }
    const p = document.createElement("p");
    p.className = "text-danger fw-5";
    p.innerHTML = msg;
    parent.appendChild(p);
}

const removeError = (arr) => {
    arr.forEach(id => {
        const parent = document.getElementById(id).parentNode;
        if (parent.children[parent.children.length - 1].tagName == 'P') {
            parent.children[parent.children.length - 1].remove();
        }
    })
}

const isValidPassword = () => {
    const password = document.getElementById("password");
    const repassword = document.getElementById("repassword");
    removeError(["password", "repassword"]);

    let falg = true;
    if (password.value != repassword.value) {
        flag = false;
        errorGenrate("repassword", "Sorry, Password and Re-password is not match...")
    }
    if (repassword.value == "") {
        flag = false;
        errorGenrate("repassword", "Plase, Enter your re-password...")
    }
    if (password.value == "") {
        flag = false;
        errorGenrate("password", "Plase, Enter your password...")
    }
    // return false;

    return flag;
}

const isValidUSer = () => {
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const email = document.getElementById("email");
    const phoneno = document.getElementById("phoneno");
    let flag = true;
    let EMAIL = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
    let CONTACT = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    removeError(['firstname', 'lastname', 'email', 'phoneno'])
    if (CONTACT.test(phoneno.value) == false) {
        phoneno.focus();
        errorGenrate('phoneno', 'Sorry, Please enter valid mobile no...');
        flag = false;
    }
    if (EMAIL.test(email.value) == false) {
        email.focus();
        errorGenrate('email', 'Sorry, Please enter valid email...');
        flag = false;
    }
    if (phoneno.value == "") {
        phoneno.focus();
        errorGenrate('phoneno', 'Phone number is required...');
        flag = false;
    }
    if (email.value == "") {
        email.focus();
        errorGenrate('email', 'Email ID is required...');
        flag = false;
    }
    if (lastname.value == "") {
        lastname.focus();
        errorGenrate('lastname', 'Last name is required...');
        flag = false;
    }
    if (firstname.value == "") {
        firstname.focus();
        errorGenrate('firstname', 'First name is required...');
        flag = false;
    }

    return flag;
}

const addUser = async () => {
    if (isValidUSer() == false) {
        return false;
    }
    let data = new URLSearchParams(new FormData(document.getElementById("register_form")));
    document.getElementById('error').style.display = 'block';

    let host = global.env.HOST;
    let port = global.env.PORT;
    
    if (data) {
        let response = await fetch(`http://${host}:${port}/user`, {
            method: "post",
            body: data,
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            },
        })
        response = await response.json();
        if (response.flag == true) {
            document.getElementById('error').className = "alert alert-success text-center p-2 bold";
            create_timer("active_timer", global.env.ACTIVATION_LINK_TIME)
        }
        document.getElementById('error').innerHTML = response.msg;
    }
    else {
        document.getElementById('error').innerHTML = response.msg;
    }
    return true;
}


const displayUser = async() => {
    const img = document.getElementById("img");
    const email = document.getElementById("email");

    let result = await fetch(`/user?activation_code=${window.location.href.split('/').pop()}`);
    result = await result.json();
    result = result.data;

    img.innerHTML = result[0].email.charAt(0);
    email.innerHTML = result[0].email;

    document.getElementById("emailid").value = result[0].email;
}

const isValidForgetPassword = () => {
    const username = document.getElementById("username");
    removeError(['username'])
    let flag = true;
    if (username.value == "") {
        username.focus();
        errorGenrate('username', 'Email ID / Mobile number is required...');
        flag = false;
    }  

    return flag;
}

const forgetpassword = async() => {
    if(isValidForgetPassword() == false)
    {
        return false;
    }

    let timer = global.env.ACTIVATION_LINK_TIME;
    let host = global.env.HOST;
    let port = global.env.PORT;
    const username = document.getElementById("username").value;
    let response = await fetch(`http://${host}:${port}/forgetpassword/${username}`);
    response = await response.json();

    document.getElementById('error').style.display = "block"
    if (response.flag == true) {
        document.getElementById('error').className = "alert alert-success text-center p-2 bold";
        create_timer("active_timer", global.env.ACTIVATION_LINK_TIME)
    }
    document.getElementById('error').innerHTML = response.msg;
    return true;
}

const isLogin = async() => {
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    let flag = true;
    removeError(['username', 'password'])
    
    if(password.value == "")
    {
        flag = false;
        password.focus();
        errorGenrate("password", 'Password is required..');
    }
    if(username.value == "")
    {
        flag = false;
        username.focus();
        errorGenrate("username", 'Email/Mobileno id is required..');
    }

    if(flag == false) return false;
   
    let data = new URLSearchParams(new FormData(document.getElementById("login_form")))
        
    let host = global.env.HOST;
    let port = global.env.PORT;
    let url =  `http://${host}:${port}/login`;
    let result = await fetch(url, {
        method: "post",
        body: data,
        headers: {
            'Content-Type': "application/x-www-form-urlencoded"
        },
    })
    result = await result.json();
    
    if(result.flag == false)
    {
        if(result.login_expired == true)
        {
            create_timer("active_timer", global.env.BLOCKED_ACCOUNT)
        }
        document.getElementById("error").style.display = 'block';
        document.getElementById("error").innerHTML = result.msg;
        return false;
    }
    else
    {
        const token = result.token;
        let url = `http://${host}:${port}/dashboard/${token}`
        window.location = url;
    }
}

const create_timer = (id, timer) => {
    let parent = document.getElementById(id);
    let time = document.createElement("p");
    parent.innerHTML = "";
    time.className = 'text-center text-danger';
    parent.appendChild(time);

    window.setInterval(() => {
        if (timer >= 0)
            time.innerHTML = `Activation Time : ${timer--}`;
        else {
            document.getElementById('error').style.display = 'none';
            time.remove();
        }
    }, 1000)
}