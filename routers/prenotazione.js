const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const prenotaziones = require('../controllers/prenotazioneController');

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
router.post('/create' , prenotaziones.createNew);
// aggiornamento persona  
router.put('/updatebyid/:id' , prenotaziones.updateByid);
// cancellazione persona
router.delete('/deletebyid/:id' , prenotaziones.delete);
// ricerca prenotazione per evento
router.get('/pren/Prenotazionibyevento/:idevento', prenotaziones.getPrenotazinibyevento);
// ricerca prenotazione per stato  // ok

router.get('/pren/getPrenotazionibystato/:idday/:stato'  , prenotaziones.getPrenotazinibystato);
// ricerca prenotazione per email
router.get('/pren/getPrenotazionibyemail/:email'  , prenotaziones.getPrenotazionibyemail);
// conteggio prenotazioni per evento
router.get('/count/:id' , prenotaziones.getCountbyevento);
// conteggio prenotazioni per evento e stato
router.get('/countStato/:id/:stato' , prenotaziones.getCountbyeventoestato);


// ricerca prenotazioni da evadere
router.get('/pren/getdaEvadere' , prenotaziones.getdaEvadere);

// invio email di conferma prenotazione evento
router.post('/sendConferma' , prenotaziones.prenotazioneConfermata);
// determinazione delle giornate di conferma
router.get('/giornate/:id'  , prenotaziones.giornateConf);

// ricerca prenotazione per stato  // ok
router.get('/pren/Prenotazionibyeventoestato/:idevento/:stato'  , prenotaziones.getPrenotazionibyeventoestato);

// ricerca prenotazione per dataconf
router.get('/pren/getPrenotazionibydataconf/:dataconf'  , prenotaziones.getPrenotazionibydataconf);

// lettura posto per cognome-nome-token
router.get('/getbyconoto/:cognome/:nome/:token', [authjwt.verifyToken] , prenotaziones.getbycognnometoken); 

// ricerca prenotazione per giornata  // ok
router.get('/pren/getPrenotazionibygiornata/:idgiornata'  , prenotaziones.getPrenotazionibygiornata);


// invio email di conferma prenotazione serata a sanfra
router.post('/sendprenotazionedaConfermare' , prenotaziones.sendprenotazionedaConfermare);

// ricerca prenotazione per giornata  // ok
router.get('/getbytoken/:token'  , prenotaziones.getbytoken);

module.exports = router;
