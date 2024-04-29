const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const cassamov = require('../controllers/cassamovController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , cassamov.getAllcassamov);
router.get('/' , [authjwt.verifyToken], cassamov.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , cassamov.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], cassamov.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], cassamov.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], cassamov.delete);

// lettura movimenti singola giornata
router.get('/cassa/All/:id', [authjwt.verifyToken] , cassamov.getAllbyCassa);    // 

// lettura movimenti dell'evento
router.get('/cassa/All/Evento/:id', [authjwt.verifyToken] , cassamov.getAllbyEvento);    // 

// lettura movimenti dell'evento per tipo pagamento
router.get('/cassa/All/Evento/tipopag/:id/:tipopag', [authjwt.verifyToken] , cassamov.getAllbyEventoetipopag);    // 

// lettura movimenti dell'evento per provenienza
router.get('/cassa/All/Evento/provenienza/:id/:provenienza', [authjwt.verifyToken] , cassamov.getAllbyEventoeprovenienza);    // 

// lettura movimenti dell'evento per provenienza e tipo pagamento
router.get('/cassa/All/Evento/provenienzatipopag/:id/:provenienza/:tipopag', [authjwt.verifyToken] , cassamov.getAllbyEventoeprovenienzatipopag);    // 


// lettura movimenti cassa per 'evento giornata provenienza 
router.get('/cassa/All/Eventodata/provenienza/:id/:day/:provenienza', [authjwt.verifyToken] , cassamov.getAllbyEventodataeprovenienza);    // 

// lettura movimenti cassa per 'evento giornata tipopag e provenienza 
router.get('/cassa/All/Eventodata/provenienzatipopag/:id/:day/:tipopag/:provenienza', [authjwt.verifyToken] , cassamov.getAllbyEventodataeprovenienzatipopag);    // 

module.exports = router;

