const jwt = require("jsonwebtoken");
const config = require("../config.json");



getPayload = (token) => {
  console.log('getPayload ------------    inizio')
  var decode = jwt.decode(token, { complete: true});
  console.log('get-payload - fine  ------- decode: ' + decode.payload)
  return decode.payload;
}


verifyToken = (req, res, next) => {

 // console.log('verifyToken - ------------------------------------------------------ inizio')

  if(req.headers['authorization'] == null ) {
    res.sendStatus(401);
} else {
    let bearerHeader = req.headers['authorization'];
   // console.log('midd-jwt -1------- token: ' + bearerHeader);
    const token = bearerHeader.split(' ')[1]
    req.token = token
  //  console.log('midd-jwt -2-- token: ' + token);

    next();

  /*     old
  const bearerHeader = req.headers['authorization']
  console.log('verifyToken - ---  bearerHeader  -------' + bearerHeader);
  console.log('verifyToken - ---  typeof bearerHeader  -------' + (typeof bearerHeader));
  if(typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(403)
  }

*/


  };

}


const authJwt = {
    verifyToken: verifyToken,
    getPayload: getPayload
   
  };
  
  module.exports = authJwt;
