const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const listinoworks = require('../controllers/listinoworkController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
router.get('/' , [authjwt.verifyToken], listinoworks.getAll);

// lettura singolo utente
router.get('/:id'  , listinoworks.getbyid);

// creazione nuovo utente
router.post('/create',  listinoworks.createNew);   // [authjwt.verifyToken] ,
// aggiornamento utente  
router.put('/updatebyid/:id' , listinoworks.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', listinoworks.delete);

module.exports = router;

