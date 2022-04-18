const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const cassa = require('../controllers/CassasController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte taglie
router.get('/' , [authjwt.verifyToken] , cassa.getAll);
// lettura taglia
router.get('/:id', [authjwt.verifyToken]  , cassa.getbyid);

// creazione nuova taglia
router.post('/create', [authjwt.verifyToken] , cassa.createNew);
// aggiornamento taglia 
router.put('/updatebyid/:idtaglia/:idGiornata', [authjwt.verifyToken] , cassa.updateByid);
// cancellazione taglia
router.delete('/deletebyid/:id', [authjwt.verifyToken] , cassa.delete);
// cancellazione Cassa della commanda
router.delete('/deletebyidGiornata/:idGiornata', [authjwt.verifyToken] , cassa.deletebyGiornata);

// lettura taglia
router.get('/idGiornata/:idGiornata', [authjwt.verifyToken]  , cassa.getbyidGiornata);

// rilettura totali
router.get('/totaliidGiornata/:idGiornata', [authjwt.verifyToken]  , cassa.gettotalibyidGiornata);

// lettura taglia e giornata
router.get('/getbytaglia/:idGiornata/:idTaglia', [authjwt.verifyToken]  , cassa.getbyidTagliaeGiorno);

// lettura taglie del giorno
router.get('/gettagliebyDay/:idGiornata', [authjwt.verifyToken]  , cassa.gettagliebyDay);

module.exports = router;

