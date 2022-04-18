// tabella t_competenza_prodottos  -  categoria -- prodottos  
const express = require('express');
const router = express.Router();

const tcompetenzaprodotto = require('../controllers/tcompetenzaprodottoController');


// lettura tutte le tipologie
router.get('/', tcompetenzaprodotto.getAll);
// lettura singola categoria
router.get('/:id', tcompetenzaprodotto.getbyid);
// creazione nuova categoria
router.post('/create', tcompetenzaprodotto.createNew);
// aggiornamento categoria
router.put('/updatebyid/:id', tcompetenzaprodotto.updateByid);
// cancellazione categoria
router.delete('/deletebyid/:id', tcompetenzaprodotto.delete);

// lettura ultimo id
router.get('/lastid', tcompetenzaprodotto.getLastId);


module.exports = router;