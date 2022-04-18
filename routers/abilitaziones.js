const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');
//        const jwtxx = require('../middleware/jwtxx');                      //  --------------- test
const abilitaziones = require('../controllers/AbilitazionesController');


// lettura abilitazioni singolo utente
// router.get('/:id', [authjwt.verifyToken] , users.getUserbyid);
router.get('/:id', abilitaziones.getbyid);

// lettura utente per email
// router.get('/:id/edit', [authjwt.verifyToken], users.getUserbyemail);
router.get('/:id/edit', abilitaziones.getbyid);

// router.get('/:id/edit', [authjwt.verifyToken], users.getUserbyemail);
// singola abilitazione
router.get('/abil/:id', abilitaziones.getabilbyid);

// creazione nuovo utente
router.post('/create', abilitaziones.createNewAbilitazione);
// aggiornamento utente  
router.put('/updatebyid/:id', abilitaziones.updateUserByid);
// cancellazione utente
router.delete('/deletebyid/:id', abilitaziones.deleteAbilitazione);







module.exports = router;