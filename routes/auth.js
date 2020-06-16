const jwt = require("express-jwt")
const secret = require("../confg").secret

function getTokenFromHeader(req01){
    if(!req1.headers.authorization) return null
    const token =  req.headers.authorization.split(" ")
    if(token[0] !== "Ecommerce") return null
    return token[1]
}

const auth = {
    require: jwt({
        secret, 
        userProperty: 'payload',
        getToken: getTokenFromHeader
    }),
    optional: jwt({
        secret, 
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: getTokenFromHeader
    })
}
module.exports = auth