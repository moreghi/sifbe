const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const cassasintetica = require('../controllers/cassasinteticaController.js');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , cassasintetica.getAllcassa);
router.get('/' , [authjwt.verifyToken], cassasintetica.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , cassasintetica.getbyid);    // 
// creazione nuovo utente
router.post('/create', cassasintetica.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', cassasintetica.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', cassasintetica.delete);

// lettura per giornata
router.get('/getbyGiornata/:idGiornata' , cassasintetica.getbyGiornata);    

module.exports = router;


  