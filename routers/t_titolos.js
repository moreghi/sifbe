// tabella t_tipologias  -  tipologia -- prodottos  
const express = require('express');
const router = express.Router();

const ttitolos = require('../controllers/TtitolosController');

// lettura tutte le tipologie
router.get('/', ttitolos.getAll);
// lettura singola tipologia
router.get('/:id', ttitolos.getbyid);
// creazione nuova tipologia
router.post('/create', ttitolos.createNew);
// aggiornamento tipologia
router.put('/updatebyid/:id', ttitolos.updateByid);
// cancellazione tipologia
router.delete('/deletebyid/:id', ttitolos.delete);

module.exports = router;