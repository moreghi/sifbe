const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const prenotprod = require('../controllers/prenotazioneprodottoController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
router.get('/' , [authjwt.verifyToken], prenotprod.getAll);

// lettura singolo utente
router.get('/:id'  , prenotprod.getbyid);

// creazione nuovo utente
router.post('/create',  prenotprod.createNew);   // [authjwt.verifyToken] ,
// aggiornamento utente  
router.put('/updatebyid/:id' , prenotprod.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken] , prenotprod.delete);

// lettura prodotti della prenotazione
router.get('/prenotazione/:id' , prenotprod.getallProdbyprenotazione);

module.exports = router;