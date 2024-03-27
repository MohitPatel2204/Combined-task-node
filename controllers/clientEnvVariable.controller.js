const clientEnvVariable = require('express').Router();

clientEnvVariable.get("/clientEnvVariable", (request, response)=>{
    response.send({
        TIME_ZONE : process.env.TIME_ZONE,
        ACTIVATION_LINK_TIME : process.env.ACTIVATION_LINK_TIME,
        HOST: process.env.HOST,
        PORT: process.env.PORT,
        BLOCKED_ACCOUNT: process.env.BLOCKED_ACCOUNT,
        POSTS_API_URL : process.env.POSTS_API_URL,
        COMMENTS_API_URL : process.env.COMMENTS_API_URL,
    })
})

module.exports = clientEnvVariable;