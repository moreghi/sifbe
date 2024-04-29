const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const listinoprods = require('../controllers/listinoprodController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
router.get('/' ,  listinoprods.getAll);

// lettura singolo utente
router.get('/:id'  , listinoprods.getbyid);

// creazione nuovo utente
router.post('/create',  listinoprods.createNew);   // [authjwt.verifyToken] ,
// aggiornamento utente  
router.put('/updatebyid/:id' , listinoprods.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken] , listinoprods.delete);

// lettura prodotti del listino
router.get('/listino/:id' ,  listinoprods.getallProdbylistino);

// lettura prodotti del listino
router.get('/listinoamenu/:id/:sel' , listinoprods.getallProdbylistinoamenu);

// lettura prodotti del listino
router.get('/listinobystato/:id/:stato' , [authjwt.verifyToken], listinoprods.getallProdbystato);

module.exports = router;





