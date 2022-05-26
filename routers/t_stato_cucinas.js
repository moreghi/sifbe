// tabella t_statos  -  stato users  
const express = require('express');
const router = express.Router();

const tstatocucina = require('../controllers/TstatocucinasController');


// lettura tutti gli utenti
router.get('/', tstatocucina.getAll);
// lettura singolo utente
router.get('/:id', tstatocucina.getbyid);
// creazione nuovo utente
router.post('/create', tstatocucina.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', tstatocucina.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', tstatocucina.delete);

// lettura ultimo id
router.get('/lastid', tstatocucina.getLastId);

module.exports = router;