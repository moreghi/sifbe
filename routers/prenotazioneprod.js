const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const prenotazioneprods = require('../controllers/prenotazioneprodController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le persone
router.get('/'  , prenotazioneprods.getAll);

// lettura singolo utente
router.get('/:id'  , prenotazioneprods.getbyid);

// creazione nuova persona
router.post('/create' , prenotazioneprods.createNew);
// aggiornamento persona  
router.put('/updatebyid/:id' , prenotazioneprods.updateByid);
// cancellazione persona
router.delete('/deletebyid/:id' , prenotazioneprods.delete);

module.exports = router;