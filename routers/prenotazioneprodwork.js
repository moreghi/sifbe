const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const prenotazioneprodworks = require('../controllers/prenotazioneprodworkController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le persone
router.get('/'  , prenotazioneprodworks.getAll);

// lettura singolo utente
router.get('/:id'  , prenotazioneprodworks.getbyid);

// creazione nuova persona
router.post('/create' , prenotazioneprodworks.createNew);
// aggiornamento persona  
router.put('/updatebyid/:id' , prenotazioneprodworks.updateByid);
// cancellazione persona
router.delete('/deletebyid/:id' , prenotazioneprodworks.delete);

module.exports = router;