const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const graphprod = require('../controllers/GraphprodsController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura globale
router.get('/' , [authjwt.verifyToken] , graphprod.getAll);       // , [authjwt.verifyToken]
// lettura singola 
router.get('/:id', [authjwt.verifyToken] , graphprod.getidGraph);
// cancellazione singola
router.delete('/deletebyid/:id', graphprod.delete);   // , [authjwt.verifyToken] 
// cancellazione globale
router.delete('/deleteAll'  , graphprod.deleteAll);   //, [authjwt.verifyToken]
// aggiornamento 
router.put('/updatebyid/:id' ,  [authjwt.verifyToken], graphprod.updateByid);
// creazione 
router.post('/create'  ,  graphprod.createNew);   //  ,  [authjwt.verifyToken]

module.exports = router;

