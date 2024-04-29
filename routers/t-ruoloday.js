const express = require('express');
const router = express.Router();

const authjwt  = require('../middleware/authJwt');

const truolodays = require('../controllers/TruolodaysController');


// lettura tutti gli utenti
router.get('/', [authjwt.verifyToken], truolodays.getAllRuoli);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken], truolodays.getRuolobyid);
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], truolodays.createNewRuolo);
// aggiornamento utente
router.put('/updatebyid/:id', [authjwt.verifyToken], truolodays.updateRuoloByid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], truolodays.deleteRuolo);


module.exports = router;