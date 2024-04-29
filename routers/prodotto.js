const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const prodottos = require('../controllers/prodottoController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le persone
router.get('/'  , prodottos.getAll);

// lettura singolo utente
router.get('/:id'  , prodottos.getbyid);

// creazione nuova persona
router.post('/create' , prodottos.createNew);
// aggiornamento persona  
router.put('/updatebyid/:id' , prodottos.updateByid);
// cancellazione persona
router.delete('/deletebyid/:id' , prodottos.delete);

// ricerca per: Competenza // ok
router.get('/getProdottiforCompetenza/:tipo'  , prodottos.getProdottiforCompetenza)

// ricerca per: Categoria // ok
router.get('/getProdottiforCategoria/:tipo'  , prodottos.getProdottiforCategoria)

// ricerca per: Tipologia1 // ok
router.get('/getProdottiforTipologia1/:tipo'  , prodottos.getProdottiforTipologia1);

// ricerca per: Tipologoia // ok
router.get('/getProdottiforTipologia/:tipo'  , prodottos.getProdottiforTipologia);

// ricerca per: Prodotti a menu // ok
router.get('/getProdottiforMenu/:menu',  prodottos.getProdottiforMenu); 

// ricerca per: Stato // ok
router.get('/getProdottiforStato/:stato',  prodottos.getProdottiforStato); 

// ricerca per: lastid // ok
router.get('/prodottolast/lastid' , prodottos.getProdottoLastId); 

// ricerca per: amenu e competenza  ----- non messo in controller
router.get('/getProdottimenuforCompetenza/:menu/:competenza', [authjwt.verifyToken] , prodottos.getProdottimenuforCompetenza);   // getProdottiforMenbyCompetenza
                                                                                                                   
// ricerca per: reset a menu // ok
router.post('/amenu/updateamenuProdotto', prodottos.resettaamenu); 

// ricerca per: reset a menu // ok
router.post('/selectedDay/reset' , prodottos.resettaselectedDay); 

// ricerca per: tipologia attiva
router.get('/getAllProdottibytipol/attiva/:stato' , prodottos.getProdottibytipolattiva);   // , [authjwt.verifyToken]



module.exports = router;




