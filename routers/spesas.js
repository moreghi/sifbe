const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const spesas = require('../controllers/SpesasController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le persone
router.get('/'  , spesas.getAll);

// lettura singolo utente
router.get('/:id'  , spesas.getbyid);

// creazione nuovo prodotto
router.post('/create', [authjwt.verifyToken] , spesas.createNew);
// aggiornamento prodotto  
router.put('/updatebyid/:id' , spesas.updateByid);
// cancellazione prodotto
router.delete('/deletebyid/:id', [authjwt.verifyToken] , spesas.delete);

// ricerca per fornitore
router.get('/getSpeseforFornitore/:fornitore', [authjwt.verifyToken] , spesas.getSpesaforFornitore);

// ricerca per stato
router.get('/getSpeseforStato/:stato', [authjwt.verifyToken] , spesas.getSpeseforStato);

// ricerca per lastId     
router.get('/getSpeselastid/lastid', [authjwt.verifyToken] , spesas.getSpeselastid);

// conteggio per prodotto
router.get('/count/:id', [authjwt.verifyToken] , spesas.getCountbyspese);

// fornitori con spese
router.get('/getTotalibyspese/spese', [authjwt.verifyToken] , spesas.getTotalibyspese);  
// fornitori con spese - importo pagato
//router.get('/getimportispeseFornitore/:id/stato/:stato', [authjwt.verifyToken] , spesas.getimportispeseFornitore);  
router.get('/getimportispeseFornitore/:id', [authjwt.verifyToken] , spesas.getimportispeseFornitore);  


module.exports = router;


