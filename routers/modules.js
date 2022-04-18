const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const modules = require('../controllers/ModulesController');


// lettura abilitazioni singolo utente
// router.get('/:id', [authjwt.verifyToken] , users.getUserbyid);
router.get('/', [authjwt.verifyToken], modules.getAlls);

// lettura utente per email
// router.get('/:id/edit', [authjwt.verifyToken], users.getUserbyemail);
router.get('/:id', [authjwt.verifyToken], modules.getbyid);

// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], modules.createNew);
// aggiornamento utente  
router.put('/updatebyid/:id', [authjwt.verifyToken], modules.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], modules.delete);
// ultimo modulo inserito
router.get('/lastid/:id', [authjwt.verifyToken], modules.lastid);

module.exports = router;