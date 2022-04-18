const express = require('express');
const router = express.Router();

const truolos = require('../controllers/TruolosController');


// lettura tutti gli utenti
router.get('/', truolos.getAllRuoli);
// lettura singolo utente
router.get('/:id', truolos.getRuolobyid);
// creazione nuovo utente
router.post('/create', truolos.createNewRuolo);
// aggiornamento utente
router.put('/updatebyid/:id', truolos.updateRuoloByid);
// cancellazione utente
router.delete('/deletebyid/:id', truolos.deleteRuolo);




module.exports = router;