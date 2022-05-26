// tabella t_statos  -  stato users  
const express = require('express');
const router = express.Router();

const tstatoconsegna = require('../controllers/TstatoconsegnasController');


// lettura tutti gli utenti
router.get('/', tstatoconsegna.getAll);
// lettura singolo utente
router.get('/:id', tstatoconsegna.getbyid);
// creazione nuovo utente
router.post('/create', tstatoconsegna.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', tstatoconsegna.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', tstatoconsegna.delete);

// lettura ultimo id
router.get('/lastid', tstatoconsegna.getLastId);

module.exports = router;