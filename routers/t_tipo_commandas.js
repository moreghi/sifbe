// tabella t_tipologias  -  tipologia -- prodottos  
const express = require('express');
const router = express.Router();

const ttipocommanda = require('../controllers/TtipocommandasController');


// lettura tutte le tipologie
router.get('/', ttipocommanda.getAll);
// lettura tipologie per prodotti a menu
router.get('/menu', ttipocommanda.getAllmenu);
// lettura singola tipologia
router.get('/:id', ttipocommanda.getbyid);
// creazione nuova tipologia
router.post('/create', ttipocommanda.createNew);
// aggiornamento tipologia
router.put('/updatebyid/:id', ttipocommanda.updateByid);
// cancellazione tipologia
router.delete('/deletebyid/:id', ttipocommanda.delete);

module.exports = router;



