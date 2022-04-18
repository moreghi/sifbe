const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const manifestaziones = require('../controllers/ManifestazionesController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

// lettura tutti gli utenti
router.get('/'  , manifestaziones.getAll);
//           router.get('/' , users.getAllUsers);



// lettura singolo utente
router.get('/:id'  , manifestaziones.getbyid);

router.get('/getbystato/:stato' , manifestaziones.getbystato);   // , [authjwt.verifyToken]


// creazione nuovo utente
router.post('/create',  manifestaziones.createNew);   // [authjwt.verifyToken] ,
// aggiornamento utente  
router.put('/updatebyid/:id' , manifestaziones.updateByid1);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken] , manifestaziones.delete);

//router.get('/getManifestazioneActive' , manifestaziones.getManifestazioneActive);




module.exports = router;