const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const commandas = require('../controllers/CommandasController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le commande
router.get('/'  , commandas.getAll);

// lettura singola commanda
router.get('/:id'  , commandas.getbyid);

// creazione nuovo commande
router.post('/create', [authjwt.verifyToken] , commandas.createNew);

// aggiornamento commande  
router.put('/updatebyid/:id' , commandas.updateByid);

// cancellazione commanda
router.delete('/deletebyid/:id', [authjwt.verifyToken] , commandas.delete);

// ricerca per commande di giornata
router.get('/getCommandeByGiornataId/:id/:order', [authjwt.verifyToken] , commandas.getCommandeforGiornata);

// ricerca filtrata    ---  da errore
router.get('/getCommandeByGiornataIdFiltrato/:id/stato/:stato', [authjwt.verifyToken] , commandas.getCommandeforGiornataFiltro);

// ricerca per lastId    
router.get('/commandalast/lastid', [authjwt.verifyToken] , commandas.getLastCommandaid);

// cancellazione globale
router.delete('/commandadlt/deleteAll', [authjwt.verifyToken] , commandas.deleteAll);

// cancellazione globale
router.delete('/commandadlt/deleteAllTrunc', [authjwt.verifyToken] , commandas.deleteAllTrunc);

// totali per giornata   
router.get('/getConteggiByGiornataId/:id', [authjwt.verifyToken] , commandas.getConteggiByGiornataId);



// ricerca per competenza e stato ordinata
router.get('/getCommandeByGiornataeCompetenzaestato/:id/comp/:comp/stato/:stato/:order', [authjwt.verifyToken] , commandas.getCommandeforGiornataeCompetenzaestato);



/*


// -------------------------  serve fare commandarighe


// ricerca per competenza ------  da controllare quando definito commandarighe
router.get('/getCommandeByGiornataeCompetenza/:id/comp/:comp', [authjwt.verifyToken] , commandas.getCommandeforGiornataeCompetenza);



// ricerca giornatta e competenza
router.get('/getCommandeByGiornataeCompetenzaerigacomma/', [authjwt.verifyToken] , commandas.getCommandeByGiornataeCompetenzaerigacomma);









*/

module.exports = router;