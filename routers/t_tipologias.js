// tabella t_tipologias  -  tipologia -- prodottos  
const express = require('express');
const router = express.Router();

const ttipologias = require('../controllers/TtipologiasController');


// lettura tutte le tipologie
router.get('/', ttipologias.getAll);
// lettura tipologie per prodotti a menu
router.get('/menu', ttipologias.getAllmenu);
// lettura singola tipologia
router.get('/:id', ttipologias.getbyid);
// creazione nuova tipologia
router.post('/create', ttipologias.createNew);
// aggiornamento tipologia
router.put('/updatebyid/:id', ttipologias.updateByid);
// cancellazione tipologia
router.delete('/deletebyid/:id', ttipologias.delete);

// lettura tipologie per prodotti a menu
router.get('/allbystato/:stato', ttipologias.getAllbyStato);



module.exports = router;