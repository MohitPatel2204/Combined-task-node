require('dotenv').config();
const express = require('express');
const loger = require('pino')()
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
    try{
        if(error)
        {
            loger.error(`ERROR : Other server is running ${port}, So change port number`)
        }
        else
        {
            loger.info(`Server is running ${port}`);
            loger.info(`URL is : http://${process.env.HOST}:${port}/index`);
            app.use(cookieParser());
            app.use(routers);
        }
    }
    catch(error){
        loger.error(`ERROR : Other server is running ${port}, So change port number`)
    }
})