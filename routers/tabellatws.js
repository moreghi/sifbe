// tabella tabella_tw_detts 
const express = require('express');
const router = express.Router();

const ttabellatws = require('../controllers/TtabellatwsController');

// lettura tutte le tipologie
router.get('/', ttabellatws.getAll);
// lettura singola tipologia
router.get('/:id', ttabellatws.getbyid);
// creazione nuova tipologia
router.post('/create', ttabellatws.createNew);
// aggiornamento tipologia
router.put('/updatebyid/:id', ttabellatws.updateByid);
// cancellazione tipologia
router.delete('/deletebyid/:id', ttabellatws.delete);

// cancellazione globale tabella
router.delete('/deleteAll', ttabellatws.deleteAll);

module.exports = router;