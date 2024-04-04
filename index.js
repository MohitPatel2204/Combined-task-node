require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const routers = require('./router/router');
const app = express();

const port = process.env.PORT || 8000;

app.set("view engine", "ejs");  

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, error=>{
    if(error)
    {
        console.log(`ERROR : Other server is running ${port}, So change port number`)
    }
    else
    {
        console.log(`Server is running ${port}`);
        console.log(`URL is : http://${process.env.HOST}:${port}/index`);
        app.use(cookieParser());
        app.use(routers);
    }
})