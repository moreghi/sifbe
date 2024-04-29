const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const prenotazioneworks = require('../controllers/prenotazioneworkController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le persone
router.get('/'  , prenotazioneworks.getAll);

// lettura singolo utente
router.get('/:id'  , prenotazioneworks.getbyid);

// creazione nuova persona
router.post('/create' , prenotazioneworks.createNew);
// aggiornamento persona  
router.put('/updatebyid/:id' , prenotazioneworks.updateByid);
// cancellazione persona
router.delete('/deletebyid/:id' , prenotazioneworks.delete);

// lettura ultimo inserito
router.get('/getlast/:id'  , prenotazioneworks.getlast);




module.exports = router;
