const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const commandaws = require('../controllers/CommandawsController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte le commande
router.get('/' , [authjwt.verifyToken] , commandaws.getAll);

// lettura singola commanda
router.get('/:id' , [authjwt.verifyToken] , commandaws.getbyid);

// creazione nuovo commande
router.post('/create', [authjwt.verifyToken] , commandaws.createNew);

// aggiornamento commande  
router.put('/updatebyid/:id', [authjwt.verifyToken] , commandaws.updateByid);

// cancellazione commanda
router.delete('/deletebyid/:id', [authjwt.verifyToken] , commandaws.delete);

module.exports = router;

