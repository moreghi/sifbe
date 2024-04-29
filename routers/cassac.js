const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const cassac = require('../controllers/CassacsController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte taglie
router.get('/' , [authjwt.verifyToken] , cassac.getAll);
// lettura taglia
router.get('/:id', [authjwt.verifyToken]  , cassac.getbyid);

// creazione nuova taglia
router.post('/create', [authjwt.verifyToken] , cassac.createNew);
// aggiornamento taglia 
router.put('/updatebyid/:idtaglia/:idCommanda', [authjwt.verifyToken] , cassac.updateByid);
// cancellazione taglia
router.delete('/deletebyid/:id', [authjwt.verifyToken] , cassac.delete);
// cancellazione Cassa della commanda
router.delete('/deletebyidCommanda/:idCommanda', [authjwt.verifyToken] , cassac.deletebyCommanda);

// lettura taglie
router.get('/idCommanda/:idCommanda', [authjwt.verifyToken]  , cassac.getbyidCommanda);

// rilettura totali
router.get('/totaliidCommanda/:idCommanda', [authjwt.verifyToken]  , cassac.gettotalibyidCommanda);

// lettura taglia e giornata
router.get('/getbytaglia/:idCommanda/:idTaglia', [authjwt.verifyToken]  , cassac.getbyidTagliaeCommanda);


module.exports = router;