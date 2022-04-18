const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const fornitores = require('../controllers/FornitoresController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le persone
router.get('/'  , fornitores.getAll);

// lettura singolo utente
router.get('/:id'  , fornitores.getbyid);

// creazione nuova persona
router.post('/create', [authjwt.verifyToken] , fornitores.createNew);
// aggiornamento persona  
router.put('/updatebyid/:id' , fornitores.updateByid);
// cancellazione persona
router.delete('/deletebyid/:id', [authjwt.verifyToken] , fornitores.delete);

// ricerca lastID
router.get('/fornitorelast/lastid', [authjwt.verifyToken] , fornitores.getfornitoreLastId);

// ricerca per settore
router.get('/settore/:settore', [authjwt.verifyToken] , fornitores.getfornitorebySettore);




module.exports = router;


    
   