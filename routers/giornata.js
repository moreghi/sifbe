const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const giornata = require('../controllers/giornataController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})


console.log('backend .. giornataRouter ')


// lettura tutti gli utenti
router.get('/' , [authjwt.verifyToken], giornata.getAll);
//           router.get('/' , users.getAllUsers);

// lettura singolo utente
router.get('/:id'  , giornata.getbyid);

router.get('/getbystato/:stato', [authjwt.verifyToken] , giornata.getbystato);   // 

// creazione nuovo utente
router.post('/create',  giornata.createNew);   // [authjwt.verifyToken] ,
// aggiornamento utente  
router.put('/updatebyid/:id' , giornata.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken] , giornata.delete);

// moreno
router.get('/getGiornateByManif/:id'  , giornata.getGiornateByManif);  // ok

router.get('/getGiornateByManifbyStato/:id/tipo/:tipo' , [authjwt.verifyToken] , giornata.getGiornateManifbyStato);  // ok

router.get('/giornataact/getGiornataactive/' , [authjwt.verifyToken] , giornata.getGiornataactive);  // ok

router.get('/getLastGiornataByManifId/:id'  , giornata.getLastGiornataByManifId);  // ok  <!-- [authjwt.verifyToken] -->

router.get('/getforChart/graph/:id' , [authjwt.verifyToken] , giornata.getforChart);  // ok

router.get('/getGiornateByStato/:stato' , giornata.getGiornateByStato);  // ok  , [authjwt.verifyToken] 

router.get('/getgiornatebymanif/:id'  , giornata.getGiornateByManif);  // ok


router.get('/getAllGiornatebyManif/:id'  , giornata.getGiornateByManif);  // ok

router.get('/getbyggmmaaaa/:ggmmaaaa'  , giornata.getbyggmmaaaa);  // ok

module.exports = router;

