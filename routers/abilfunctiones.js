const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const abilfunctions = require('../controllers/AbilfunctionsController');


// lettura abilitazioni singolo utente
// router.get('/:id', [authjwt.verifyToken] , users.getUserbyid);
router.get('/', [authjwt.verifyToken], abilfunctions.getAlls);

// lettura utente per email
// router.get('/:id/edit', [authjwt.verifyToken], users.getUserbyemail);
router.get('/:id', [authjwt.verifyToken], abilfunctions.getbyid);

// router.get('/:id/edit', [authjwt.verifyToken], users.getUserbyemail);
// singola abilitazione
router.get('/:id/level', [authjwt.verifyToken], abilfunctions.getbylevel);

// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], abilfunctions.createNew);
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], abilfunctions.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], abilfunctions.delete);
// lettura funzione utente da rotta e profilo

router.get('/:level/route/:rotta', [authjwt.verifyToken], abilfunctions.getfunzionebyrotta);



module.exports = router;