// tabella tabella_tw_detts 
const express = require('express');
const router = express.Router();

const ttabellatwdetts = require('../controllers/TtabellatwdettsController');

// lettura tutte le tipologie
router.get('/', ttabellatwdetts.getAll);
// lettura singola tipologia
router.get('/:id', ttabellatwdetts.getbyid);
// creazione nuova tipologia
router.post('/create', ttabellatwdetts.createNew);
// aggiornamento tipologia
router.put('/updatebyid/:id', ttabellatwdetts.updateByid);
// cancellazione tipologia
router.delete('/deletebyid/:id', ttabellatwdetts.delete);

// cancellazione globale tabella
router.delete('/deleteAll', ttabellatwdetts.deleteAll);

module.exports = router;