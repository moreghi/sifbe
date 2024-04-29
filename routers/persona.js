const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const persona = require('../controllers/personaController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
router.get('/' , [authjwt.verifyToken], persona.getAll);

// lettura singolo utente
router.get('/:id'  , persona.getbyid);

// creazione nuovo utente
router.post('/create',  persona.createNew);   // [authjwt.verifyToken] ,
// aggiornamento utente  
router.put('/updatebyid/:id' , persona.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken] , persona.delete);

// lettura per ruolo
router.get('/getbyGiornata/Ruolo/:idGiornata/:idRuolo' , [authjwt.verifyToken], persona.getbyRuolo);

// lettura by giornata
router.get('/getbyGiuornata/:idGiornata', [authjwt.verifyToken] , persona.getbyGiornata); 

// lettura per in servizio
router.get('/getPersonabyinServizio/:idGiornata/:inservizio' , [authjwt.verifyToken], persona.getPersonabyinServizio);

// lettura per utilizzato commanda
router.get('/getPersonabyutilizzoCommanda/:idGiornata/:utilizzato' , [authjwt.verifyToken], persona.getPersonabyutilizzoCommanda);

module.exports = router;

