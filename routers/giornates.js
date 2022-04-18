const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const giornates = require('../controllers/GiornatesController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , giornates.getAll);
router.get('/' , giornates.getAll);

// lettura singola giornata
// router.get('/:id', [authjwt.verifyToken] , giornates.getbyid);
router.get('/:id' , giornates.getbyid);  

// cancellazione giornata
// router.delete('/:id', [authjwt.verifyToken], giornates.delete);
router.delete('/:id', giornates.delete);
// aggiornamento giornata 
// router.put('/:id', [authjwt.verifyToken], giornates.updatebyid);
router.put('/:id', giornates.updatebyid);
// creazione nuova giornata
// router.post('/', [authjwt.verifyToken], giornates.create);
router.post('/', giornates.create);
// lettura giornata per manifestazione
//router.get('/getGiornateByManifId/:id', [authjwt.verifyToken], giornates.getGiornateByManifId);
router.get('/getGiornateByManifId/:id', giornates.getGiornateByManifId);
// lettura giornata per manifestazione - filtrata
// router.get('/getGiornateByManifIdbyStato/:id/tipo/:tipo', [authjwt.verifyToken], giornates.getGiornateByManifIdbyStato);
router.get('/getGiornateByManifIdbyStato/:id/tipo/:tipo', giornates.getGiornateByManifIdbyStato);
// lettura giornata ATTIVA
// router.get('/giornataact/getGiornataactive/', [authjwt.verifyToken], giornates.getGiornataActive);
router.get('/giornataact/getGiornataactive/', giornates.getGiornataActive);
// lettura giornata - ultima Giornata
router.get('/giornataManif/lastid', [authjwt.verifyToken], giornates.getlastGiornata);
// lettura ultima giornata della Manifestazione
// router.get('/getLastGiornataByManifId/:id', [authjwt.verifyToken], giornates.getLastGiornataByManif);
router.get('/getLastGiornataByManifId/:id', giornates.getLastGiornataByManif);
// lettura giornate della Manifestazione
//router.get('/getGiornateByManifId/:id', [authjwt.verifyToken], giornates.getGiornateByManifId);



router.get('/getforChart/graph/:id', giornates.getforChart);




module.exports = router;