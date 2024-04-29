const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test

const forgotpwd = require('../controllers/forgotpwdController');
router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})


// lettura singolo settore
router.get('/:email', [authjwt.verifyToken] , forgotpwd.getbyemail);    // 

// richiesta reset  password con invio email
router.post('/forgotpwd', [authjwt.verifyToken], forgotpwd.forgotpwd);    // 

// conferma reset password
router.post('/confresetuserpwd', [authjwt.verifyToken], forgotpwd.confresetuserpwd);    // 

// effettuazione reset password
router.post('/resetpassword', [authjwt.verifyToken], forgotpwd.resetpassword);    // 


/*   non esistono   candellarli anche da service

// lettura tutti i settori
// router.get('/', [authjwt.verifyToken] , forgotpwd.getAlleventosettore);
router.get('/' , [authjwt.verifyToken], forgotpwd.getAll);
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], forgotpwd.createNew);    // 
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], forgotpwd.delete);

// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], forgotpwd.updateByid);

*/


module.exports = router;

