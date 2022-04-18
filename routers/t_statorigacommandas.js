const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const tstatorigacomm = require('../controllers/TstatorigacommandasController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le persone
router.get('/' , [authjwt.verifyToken] , tstatorigacomm.getAll);

// lettura singolo utente
router.get('/:id' , [authjwt.verifyToken] , tstatorigacomm.getbyid);

// creazione nuovo prodotto
router.post('/create', [authjwt.verifyToken] , tstatorigacomm.createNew);
// aggiornamento prodotto  
router.put('/updatebyid/:id', [authjwt.verifyToken] , tstatorigacomm.updateByid);
// cancellazione prodotto
router.delete('/deletebyid/:id', [authjwt.verifyToken] , tstatorigacomm.delete);

module.exports = router;

