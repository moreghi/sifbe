const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const cassawcs = require('../controllers/CassawcsController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte taglie
router.get('/' , [authjwt.verifyToken] , cassawcs.getAll);

// lettura tutte taglie della commnada
router.get('/commandataglie/:idCommanda' , [authjwt.verifyToken] , cassawcs.getAllTagliebyCommanda);

// lettura tutte taglie della commnada senza moneta
router.get('/commandataglieNoMoney/:idCommanda' , [authjwt.verifyToken] , cassawcs.gettaglieNoMoneybyCommanda);

// lettura taglia della commanda
router.get('/commandataglia/:idCommanda/:idTaglia', [authjwt.verifyToken]  , cassawcs.getTagliabyCommanda);
// cancellazione taglia
router.delete('/deletebyid/:id', [authjwt.verifyToken] , cassawcs.delete);
// aggiornamento taglia 
router.put('/updatebyid/:idTaglia/:idCommanda' , cassawcs.updateByid);   // , [authjwt.verifyToken]
// creazione nuova taglia
router.post('/create', [authjwt.verifyToken] , cassawcs.createNew);
// cancellazione Cassa della commanda
router.delete('/deletebyidCommanda/:idCommanda', [authjwt.verifyToken] , cassawcs.deletebyCommanda);

// azzeramento importi cassa Commanda Full
router.put('/azzerabyidCommandaFull/:idCommanda' , cassawcs.azzeraFullbyidCommanda);

// azzeramento importi cassa Commanda Reso
router.put('/azzerabyidCommandaResto/:idCommanda' , cassawcs.azzeraRestobyidCommanda);  

// rilettura totali
router.get('/totaliidCommanda/:idCommanda', [authjwt.verifyToken]  , cassawcs.gettotalibyidCommanda);


// aggiornamento taglia test
router.post('/updatebyidTest/:idTaglia/:idCommanda', cassawcs.updatebyidTest);   // , [authjwt.verifyToken] 

// cancellazione Cassa della commanda
router.delete('/deleteTagliaByidCommanda/:idTaglia/:idCommanda', [authjwt.verifyToken] , cassawcs.deleteTagliaByidCommanda);

// aggiornamento taglia - resto
router.put('/updateRestobyid/:idTaglia/:idCommanda' , cassawcs.updateRestoByid);


module.exports = router;

