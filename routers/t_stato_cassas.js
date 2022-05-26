// tabella t_statos  -  stato users  
const express = require('express');
const router = express.Router();

const tstatocassa = require('../controllers/TstatocassasController');


// lettura tutti gli utenti
router.get('/', tstatocassa.getAll);
// lettura singolo utente
router.get('/:id', tstatocassa.getbyid);
// creazione nuovo utente
router.post('/create', tstatocassa.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', tstatocassa.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', tstatocassa.delete);

// lettura ultimo id
router.get('/lastid', tstatocassa.getLastId);

module.exports = router;