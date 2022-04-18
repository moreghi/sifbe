const express = require('express');
const router = express.Router();
// middleware per controllo token
const authjwt  = require('../middleware/authJwt');

const truolodays = require('../controllers/truolodaysController');


// lettura tutti gli utenti
router.get('/', [authjwt.verifyToken], truolodays.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken], truolodays.getbyid);
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], truolodays.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', [authjwt.verifyToken], truolodays.updatebyid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], truolodays.deletebyid);




module.exports = router;