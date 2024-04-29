const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const comunicato = require('../controllers/comunicatoController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , comunicato.getAllcomunicato);
router.get('/' , [authjwt.verifyToken], comunicato.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , comunicato.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], comunicato.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], comunicato.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], comunicato.delete);

// lettura movimenti dell'evento
router.get('/getby/datain', [authjwt.verifyToken] , comunicato.getbydatain);    // 
// lettura per stato
router.get('/getbyStato/:stato', [authjwt.verifyToken] , comunicato.getbyStato);    // 

// creazione sottocartella su comunicato
router.get('/folder/:folder', [authjwt.verifyToken] , comunicato.createFolder);    // 

// conteggio n.ro comunicati nell'anno
router.get('/getcountbyAnno/:anno', [authjwt.verifyToken] , comunicato.getcountbyAnno);    // 



module.exports = router;