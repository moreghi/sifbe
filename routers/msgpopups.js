const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const msgpopups = require('../controllers/MsgpopupsController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le persone
router.get('/'  , msgpopups.getAll);

// lettura singolo utente
router.get('/:id'  , msgpopups.getbyid);

// creazione nuova persona
router.post('/create', [authjwt.verifyToken] , msgpopups.createNew);
// aggiornamento persona  
router.put('/updatebyid/:id' , msgpopups.updateByid);
// cancellazione persona
router.delete('/deletebyid/:id', [authjwt.verifyToken] , msgpopups.delete);

module.exports = router;


    
   