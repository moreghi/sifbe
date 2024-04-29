const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const commandawrigas = require('../controllers/CommandawrigaController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le commande
router.get('/:idCommanda' , [authjwt.verifyToken] , commandawrigas.getAll);

// lettura singola commanda
router.get('/:id' , [authjwt.verifyToken] , commandawrigas.getbyid);

// creazione nuovo commande
router.post('/create', [authjwt.verifyToken] , commandawrigas.createNew);

// aggiornamento commande  
router.put('/updatebyid/:id', [authjwt.verifyToken] , commandawrigas.updateByid);

// cancellazione commanda
router.delete('/deletebyid/:id', [authjwt.verifyToken] , commandawrigas.delete);
 

// lettura per tipo
router.get('/getProdottiforTipologia/:tipo', [authjwt.verifyToken] , commandawrigas.getProdottiforTipologia);
// lettura per commanda e tipo
router.get('/getProdottibyTipologiaComma/:tipo/ncomma/:idcommanda', [authjwt.verifyToken] , commandawrigas.getProdottibyTipologiabycomm);
// lettura prodotti ordinati
router.get('/getProdottiOrdinati/:idcommanda', [authjwt.verifyToken] , commandawrigas.getProdottiOrdinati);

// lettura singola riga per codice prodotto
router.get('/prodotto/:idCommanda/:idProdotto' , [authjwt.verifyToken] , commandawrigas.getbyidProdotto);

// lettura righe per idcommanda
router.get('/AllbyCommandaw/:idCommanda' , [authjwt.verifyToken] , commandawrigas.getAllbyCommandaw);


module.exports = router;
