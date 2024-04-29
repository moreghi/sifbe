const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const listinoprodworks = require('../controllers/listinoprodworkController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
router.get('/' , listinoprodworks.getAll);  //, [authjwt.verifyToken]

// lettura singolo utente
router.get('/:id'  , listinoprodworks.getbyid);

// creazione nuovo utente
router.post('/create',  listinoprodworks.createNew);   // [authjwt.verifyToken] ,
// aggiornamento utente  
router.put('/updatebyid/:id' , listinoprodworks.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken] , listinoprodworks.delete);

// lettura prodotti del listino
router.get('/listino/:id' , listinoprodworks.getallProdbylistino);  // , [authjwt.verifyToken]

// lettura prodotti del listino
router.get('/listinoamenu/:id/:sel' , listinoprodworks.getallProdbylistinoamenu);  // , [authjwt.verifyToken]

// lettura prodotti del listino per tipologoia
router.get('/listinobytipo/:tipologia/:id' , listinoprodworks.getallProdbylistibytipo); // , [authjwt.verifyToken]

// lettura prodotti del listino per tipologoia attiva
router.get('/listinoact/:id' , listinoprodworks.getallProdattivibylistino); // , [authjwt.verifyToken]

// lettura prodotti del listino per tipologoia attiva
router.get('/getCountbyameenu/:id' , listinoprodworks.getCountbyameenu); 


// cancellazione globale
router.delete('/deleteAll' , listinoprodworks.deleteAll);

// lettura prodotti del listino per tipologoia attiva
router.get('/getProdotti/Ordinati' , listinoprodworks.getProdottiordinati); 


// lettura prodotti del listino per tipologoia
router.get('/listinobytipobyamenu/:tipologia/:id/:amenu' , listinoprodworks.getallProdbylistbytipologiabyamenu); // , [authjwt.verifyToken]

// lettura prodotti del listino per idProdotto
router.get('/listinobyidProdotto/:idProdotto' , listinoprodworks.getbyidProdotto); // , [authjwt.verifyToken]


module.exports = router;
