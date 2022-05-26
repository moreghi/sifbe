// tabella t_tabellas  
const express = require('express');
const router = express.Router();

const ttabellats = require('../controllers/TtabellasController');

// lettura tutte le tipologie
router.get('/', ttabellats.getAll);
// lettura singola tipologia
router.get('/:id', ttabellats.getbyid);
// creazione nuova tipologia
router.post('/create', ttabellats.createNew);
// aggiornamento tipologia
router.put('/updatebyid/:id', ttabellats.updateByid);
// cancellazione tipologia
router.delete('/deletebyid/:id', ttabellats.delete);

module.exports = router;