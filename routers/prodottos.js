const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const prodottos = require('../controllers/ProdottosController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le persone
router.get('/'  , prodottos.getAll);

// lettura singolo utente
router.get('/:id'  , prodottos.getbyid);

// creazione nuovo prodotto
router.post('/create', [authjwt.verifyToken] , prodottos.createNew);
// aggiornamento prodotto  
router.put('/updatebyid/:id' , prodottos.updateByid);
// cancellazione prodotto
router.delete('/deletebyid/:id', [authjwt.verifyToken] , prodottos.delete);

// ricerca per menu  
router.get('/getProdottiforMenu/:menu', [authjwt.verifyToken] , prodottos.getProdottiforMenu);

// ricerca per tipologia
router.get('/getProdottiforTipologia/:tipo', [authjwt.verifyToken] , prodottos.getProdottiforTipologia);

// ricerca per tipologia con selecteDay a 'N'
router.get('/getProdottiforTipologia1/:tipo', [authjwt.verifyToken] , prodottos.getProdottiforTipologia1);

// ricerca per categoria
router.get('/getProdottiforCategoria/:categ', [authjwt.verifyToken] , prodottos.getProdottiforCategoria);

// ricerca per competenza
router.get('/getProdottiforCompetenza/:comp', [authjwt.verifyToken] , prodottos.getProdottiforCompetenza);

// ricerca per stato
router.get('/getProdottiforStato/:stato', [authjwt.verifyToken] , prodottos.getProdottiforStato);

// ricerca per lastId     ----- da errore
router.get('/prodottolast/lastid', [authjwt.verifyToken] , prodottos.getProdottoLastId);

// resetta amenu    , [authjwt.verifyToken]
router.put('/amenu/updateamenuProdotto' , prodottos.resettaamenu);  

// resetta selectedDay    , [authjwt.verifyToken]
router.put('/selectedDay/reset' , prodottos.resettaselectedDay);  

// ricerca prodotti a menu per competenza
router.get('/getProdottimenuforCompetenza/:menu/:comp', [authjwt.verifyToken] , prodottos.getProdottimenuforCompetenza);


module.exports = router;