const jwt = require("jsonwebtoken");
const config = require("../config.json");
const db = require('../db');





chechAuth = (req, res, next) => {

    console.log('middl-jwt  chechAuth - ------------------------------------------------------ inizio')
    if(req.headers['authorization'] == null ) {
        res.sendStatus(401);
    } else {
        let bearerHeader = req.headers['authorization'];
        console.log('midd-jwt -1------- token: ' + bearerHeader);
        const token = bearerHeader.split(' ')[1]
        req.token = token
        console.log('midd-jwt -2-- token: ' + token);

        next();

        /*
        // normalizzo la payload
        var decode = jwt.decode(token, { complete: true});
        console.log('midd-jwt -3--------- decode: ' + decode.payload)
        return decode.payload;
        res.sendStatus(200).send(decode.payload)
        next();
        */
        
    }

};

const jwtxx = {
    chechAuth: chechAuth,
      
  };
  
  module.exports = jwtxx;