const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const locandinas = require('../controllers/locandinasController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
router.get('/' , [authjwt.verifyToken], locandinas.getAll);

// lettura singolo utente
router.get('/:id'  , locandinas.getbyid);

// creazione nuovo utente
router.post('/create',  locandinas.createNew);   // [authjwt.verifyToken] ,
// aggiornamento utente  
router.put('/updatebyid/:id' , locandinas.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken] , locandinas.delete);

// lettura per nome locandina
router.get('/getbynameloc/locandina/:nameloc' , [authjwt.verifyToken], locandinas.getbynameloc);

// lettura ultimo evento
router.get('/lastid/last', [authjwt.verifyToken] , locandinas.getlastid);    



module.exports = router;