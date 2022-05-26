// tabella t_tipologias  -  tipologia -- prodottos  
const express = require('express');
const router = express.Router();

const ttaglias = require('../controllers/TtagliasController');


// lettura tutte le tipologie
router.get('/', ttaglias.getAll);
// lettura singola tipologia
router.get('/:id', ttaglias.getbyid);
// creazione nuova tipologia
router.post('/create', ttaglias.createNew);
// aggiornamento tipologia
router.put('/updatebyid/:id', ttaglias.updateByid);
// cancellazione tipologia
router.delete('/deletebyid/:id', ttaglias.delete);
// lettura ultimo id
router.get('/lastid', ttaglias.getLastId);



module.exports = router;


