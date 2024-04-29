const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const comunicatodett = require('../controllers/comunicatodettController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
// router.get('/', [authjwt.verifyToken] , comunicatodett.getAllcomunicato);
router.get('/' , [authjwt.verifyToken], comunicatodett.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , comunicatodett.getbyid);    // 
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], comunicatodett.createNew);    // 
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], comunicatodett.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], comunicatodett.delete);
// lettura per cartella
router.get('/getby/folder', [authjwt.verifyToken] , comunicatodett.getbyfolder);    // 
// lettura per stato
router.get('/Allbyid/:idComm', [authjwt.verifyToken] , comunicatodett.getAllbyId);    // 

// creazione sottocartella su comunicato
router.get('/folder/:folder/:folderd', [authjwt.verifyToken] , comunicatodett.createFolder);    // 

// conteggio dettaglio comunicazioni per Comunicazione
router.get('/getcountbyidComm/:idComm', [authjwt.verifyToken] , comunicatodett.getcountbyidComm);    // 

// muovo i file da comunicazioni a cartella di dettaglio
router.get('/movetofolder/:foldercom/:folderdett/:filename', [authjwt.verifyToken] , comunicatodett.movetofolder);    // 

module.exports = router;
