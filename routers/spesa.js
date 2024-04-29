const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const spesa = require('../controllers/spesaController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , spesa.getAllspesa);
router.get('/' , [authjwt.verifyToken], spesa.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , spesa.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], spesa.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], spesa.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], spesa.delete);
// ricerca per lastId    
router.get('/getAllbyevento/:id', [authjwt.verifyToken] , spesa.getAllbyevento);
// ricerca per Cognome - Nome - Cellulare    
router.get('/getspesabyStato/:stato' , spesa.getspesabyStato);

module.exports = router;

