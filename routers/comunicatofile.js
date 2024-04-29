const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const comunicatofile = require('../controllers/comunicatofileController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , comunicatofile.getAllcomunicato);
router.get('/' , [authjwt.verifyToken], comunicatofile.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , comunicatofile.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], comunicatofile.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], comunicatofile.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], comunicatofile.delete);
// lettura per cartella
router.get('/getby/folder', [authjwt.verifyToken] , comunicatofile.getbyfolder);    // 
// lettura per stato
router.get('/Allbyid/:idComm', [authjwt.verifyToken] , comunicatofile.getAllbyId);    // 

// conteggio file per dettaglio
router.get('/getcountbyid/:id', [authjwt.verifyToken] , comunicatofile.getcountbyidComm);    // 

module.exports = router;
