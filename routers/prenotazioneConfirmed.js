const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const prenotaziones = require('../controllers/PrenotazioneConfirmedsController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le prenotazioni
router.get('/'  , prenotaziones.getAll);

// lettura singola prenotazione
router.get('/:email'  , prenotaziones.getbyemail);

// creazione nuova persona
router.post('/create', prenotaziones.createNew);
// aggiornamento persona  
router.put('/updatebyemail/:email' , prenotaziones.updateByemail);
// cancellazione email
router.delete('/deletebyemail/:email' , prenotaziones.delete);

// ricerca per token  --  OK
router.get('/getbytoken/:token', prenotaziones.getbytoken);

router.get('/getbytokencodpre/:token/:codpren' , prenotaziones.getbytokencodpre);

// ricerca per email e data prenotazione
router.get('/getbyemaildatapre/:email/:datapre' , prenotaziones.getbyemaildatapre);

// cancellazione token
router.delete('/destroyToken/:token' , prenotaziones.destroyToken);

// lettura singola prenotazione
router.get('/getbyemail/:email'  , prenotaziones.getbyemail);

router.post('/confirmed', prenotaziones.confirmedprenotazione); 

module.exports = router;


    
   