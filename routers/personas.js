const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const personas = require('../controllers/PersonasController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le persone
router.get('/'  , personas.getAll);

// lettura singolo utente
router.get('/:id'  , personas.getbyid);

// creazione nuova persona
router.post('/create', [authjwt.verifyToken] , personas.createNew);
// aggiornamento persona  
router.put('/updatebyid/:id' , personas.updateByid);
// cancellazione persona
router.delete('/deletebyid/:id', [authjwt.verifyToken] , personas.delete);


// ricerca per ruolo  --  OK
router.get('/getpersoneforRuolo/:ruolo', [authjwt.verifyToken] , personas.getpersoneforRuolo);

// ricerca per ruolo Filtrato
router.get('/getpersoneforRuolo1/:ruolo', [authjwt.verifyToken] , personas.getpersoneforRuolo1);

// ------------------------  da sistemare metodi nel controller

// ricerca per ruolo2    // su laravel  /getpersoneforRuoloFiltrato
// da errore  -  controllare
router.get('/getpersoneforRuolo2/:ruolo1/ruolo/:ruolo2', [authjwt.verifyToken] , personas.getpersoneforRuolo2);



// ricerca per persone attive
router.get('/active/getpersoneActive', [authjwt.verifyToken] , personas.getpersoneActive);

// ricerca per titolo
router.get('/getpersoneforTitolo/:titolo', [authjwt.verifyToken] , personas.getpersoneforTitolo);

// ricerca per Stato
router.get('/getpersoneforStato/:stato', [authjwt.verifyToken] , personas.getpersoneforStato);
// ricerca per livello
router.get('/getpersoneforLivello/:livello', [authjwt.verifyToken] , personas.getpersoneforLivello);

// ricerca lastID
router.get('/personeact/lastid', [authjwt.verifyToken] , personas.getpersonefLastId);

// resetta persona
router.put('/personeact/azzeraRuoloPersona', [authjwt.verifyToken] , personas.azzeraRuoloPersona);

// ricerca persone in Servizio
router.get('/inServizio/ok', [authjwt.verifyToken] , personas.getpersoneinServizio);

// ricerca persone utilizzo Commanda
router.get('/utCommanda/ok', [authjwt.verifyToken] , personas.getpersoneutCommanda);




module.exports = router;


    
   