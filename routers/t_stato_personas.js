// tabella t_statos  -  stato users  
const express = require('express');
const router = express.Router();

const tstatopersonas = require('../controllers/TstatopersonasController');


// lettura tutti gli utenti
router.get('/', tstatopersonas.getAll);
// lettura singolo utente
router.get('/:id', tstatopersonas.getbyid);
// creazione nuovo utente
router.post('/create', tstatopersonas.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', tstatopersonas.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', tstatopersonas.delete);

// lettura ultimo id
router.get('/lastid', tstatopersonas.getLastId);

module.exports = router;