const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const listinos = require('../controllers/listinoController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
router.get('/' , [authjwt.verifyToken], listinos.getAll);

// lettura singolo utente
router.get('/:id'  , listinos.getbyid);

// creazione nuovo utente
router.post('/create',  listinos.createNew);   // [authjwt.verifyToken] ,
// aggiornamento utente  
router.put('/updatebyid/:id' , listinos.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken] , listinos.delete);

module.exports = router;

