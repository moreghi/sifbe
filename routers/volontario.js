const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');    
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const volontario = require('../controllers/VolontarioController');

router.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})

router.get('/' , volontario.getAll);

// lettura singolo utente
router.get('/:id', [authjwt.verifyToken] , volontario.getbyid);

// lettura utente per email
router.get('/getbyemail/:email', [authjwt.verifyToken], volontario.getbyemail);

// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], volontario.createNew);
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], volontario.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], volontario.delete);

// lettura utente per email
router.get('/getbystato/:stato', [authjwt.verifyToken], volontario.getbystato);

module.exports = router;

