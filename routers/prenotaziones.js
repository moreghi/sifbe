const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const prenotaziones = require('../controllers/PrenotazionesController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le persone
router.get('/'  , prenotaziones.getAll);

// lettura singolo utente
router.get('/:id'  , prenotaziones.getbyid);

// creazione nuova persona
router.post('/create', [authjwt.verifyToken] , prenotaziones.createNew);
// aggiornamento persona  
router.put('/updatebyid/:id' , prenotaziones.updateByid);
// cancellazione persona
router.delete('/deletebyid/:id', [authjwt.verifyToken] , prenotaziones.delete);
// ricerca prenotazioni da evadere
router.get('/pren/getPrenotazinidaEvadere', [authjwt.verifyToken]  , prenotaziones.getPrenotazinidaEvadere);
// ricerca prenotazione da evadere
router.get('/pren/prenotazionibyday/:idgiornata', [authjwt.verifyToken] , prenotaziones.getPrenotazinidaEvaderebyday);
// ricerca prenotazione per stato  // ok
router.get('/pren/getPrenotazinibystato/:stato', [authjwt.verifyToken]  , prenotaziones.getPrenotazinibystato);
// ricerca prenotazione per email
router.get('/pren/getPrenotazionibyemail/:email', [authjwt.verifyToken]  , prenotaziones.getPrenotazionibyemail);

// invio email dopo conferma prenotazione
router.get('/pren/invioemailprenotazione/:email'  , [authjwt.verifyToken] , prenotaziones.sendmailprenconfirmed);    //



module.exports = router;

