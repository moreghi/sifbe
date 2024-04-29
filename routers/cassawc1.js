const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const cassawc1s = require('../controllers/cassawc1sController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutte taglie
router.get('/'  , cassawc1s.getAll);
// lettura singolo utente
router.get('/:id' , cassawc1s.getbyid);    // 

// cancellazione taglia
router.delete('/deletebyid/:id' , cassawc1s.delete);
// aggiornamento taglia 
router.put('/updatebyid/:id' , cassawc1s.updateByid);   

router.post('/create' , cassawc1s.createNew);

module.exports = router;

