const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const graph = require('../controllers/Graphs1Controller');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
router.get('/'  , graph.getAll);

// lettura singolo utente
router.get('/:id'  , graph.getbyid);

// creazione nuovo utente
router.post('/create',  graph.createNew);   // [authjwt.verifyToken] ,
// aggiornamento utente  
router.put('/updatebyid/:id' , graph.updateByid1);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken] , graph.delete);
// cancellazione globale
router.delete('/deleteAll'  , graph.deleteAll);   //, [authjwt.verifyToken]

module.exports = router;