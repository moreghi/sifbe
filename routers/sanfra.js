const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const sanfra = require('../controllers/sanfraController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , sanfra.getAllsanfra);
router.get('/' , sanfra.getAll);
// lettura singolo utente
router.get('/:id' , sanfra.getbyid);    // , [authjwt.verifyToken]
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], sanfra.createNew);
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], sanfra.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], sanfra.delete);

module.exports = router;