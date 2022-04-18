const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const cassaws = require('../controllers/CassawsController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte taglie
router.get('/' , [authjwt.verifyToken] , cassaws.getAll);
// lettura taglia
router.get('/:id', [authjwt.verifyToken]  , cassaws.getbyid);

// creazione nuova taglia
router.post('/create', [authjwt.verifyToken] , cassaws.createNew);
// aggiornamento taglia 
router.put('/updatebyid/:idtaglia/:idGiornata', [authjwt.verifyToken] , cassaws.updateByid);
// cancellazione taglia
router.delete('/deletebyid/:id', [authjwt.verifyToken] , cassaws.delete);
// cancellazione Cassa della commanda
router.delete('/deletebyidGiornata/:idGiornata', [authjwt.verifyToken] , cassaws.deletebyGiornata);

// lettura taglia
router.get('/idGiornata/:idGiornata', [authjwt.verifyToken]  , cassaws.getbyidGiornata);

// azzeramento importi cassa
router.put('/azzerabyidGiornata/:idGiornata' , cassaws.azzerabyidGiornata);

// rilettura totali
router.get('/totaliidGiornata/:idGiornata', [authjwt.verifyToken]  , cassaws.gettotalibyidGiornata);

module.exports = router;

