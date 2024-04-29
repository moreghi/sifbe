const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const commandarigas = require('../controllers/CommandarigasController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le commande
router.get('/'  , commandarigas.getAll);

// lettura singola riga commanda
router.get('/:id'  , commandarigas.getbyid);

// creazione nuovo commande
router.post('/create', [authjwt.verifyToken] , commandarigas.createNew);

// aggiornamento commande  
router.put('/updatebyid/:id' , commandarigas.updateByid);

// cancellazione commanda
router.delete('/deletebyid/:id', [authjwt.verifyToken] , commandarigas.delete);

// lettura righe di commanda
router.get('/commanda/:id' , [authjwt.verifyToken]  , commandarigas.getrighebyCommanda);

// lettura righe di commanda per competenza
router.get('/commanda/:id/comp/:comp/fase/:fase' , [authjwt.verifyToken]  , commandarigas.getrighebyCommandaeCompetenza);

// ricerca per prodotti Cucina da Lavorare
router.get('/getCommanderighedaLavorare/:comp/flagL/:flagl', [authjwt.verifyToken] , commandarigas.getCommanderighedaLavorare);
// ricerca per prodotti Cucina da Consegnare
router.get('/getProdottiCucinadaConsegnare/:comp/flagL/:flagl/flagC/:flagc', [authjwt.verifyToken] , commandarigas.getProdottiCucinadaConsegnare);

// ricerca per prodotti Bevande da Consegnare
router.get('/getProdottiBevandedaConsegnare/:comp/flagC/:flagc', [authjwt.verifyToken] , commandarigas.getProdottiBevandedaConsegnare);

router.get('/getProdbyCommanda/:id', [authjwt.verifyToken] , commandarigas.getProdbyCommanda);

// ricerca per prodotti per tipologia e stato
router.get('/tipologiaeStato/:tipologia/stato/:stato/:order', [authjwt.verifyToken] , commandarigas.getProdottibytipologiaeStato);
// ricerca per prodotti per prodotto e stato
router.get('/prodottoeStato/:id/stato/:stato', [authjwt.verifyToken] , commandarigas.getProdottibyprodottoeStato);
// ricerca per prodotti per tipologia
router.get('/tipologia/:tipologia/:order', [authjwt.verifyToken] , commandarigas.getAllProdottibytipologia);
// ricerca per prodotto
router.get('/prodotto/:id', [authjwt.verifyToken] , commandarigas.getAllProdottibyprodotto);

// conteggio per prodotto
router.get('/count/:comp/:id', [authjwt.verifyToken] , commandarigas.getCountbyprodotto);


// ricerca Prodotti da strsql personalizzata
router.get('/strsql/:strsql', [authjwt.verifyToken] , commandarigas.getprodottibyStrsql);




/*

   attenzione prendere i metodi di frontend e crearli qui



// ricerca filtrata    ---  da errore
router.get('/getCommandeByGiornataIdFiltrato/:id/stato/:stato', [authjwt.verifyToken] , commandarigas.getCommandeforGiornataFiltro);

// ricerca per lastId    
router.get('/commandalast/lastid', [authjwt.verifyToken] , commandarigas.getLastCommandaid);

// cancellazione globale
router.delete('/commandadlt/deleteAll', [authjwt.verifyToken] , commandarigas.deleteAll);

// cancellazione globale
router.delete('/commandadlt/deleteAllTrunc', [authjwt.verifyToken] , commandarigas.deleteAllTrunc);

// totali per giornata   
router.get('/getConteggiByGiornataId/:id', [authjwt.verifyToken] , commandarigas.getConteggiByGiornataId);









*/

module.exports = router;