// tabella t_statos  -  stato users  
const express = require('express');
const router = express.Router();

const tstatobevande = require('../controllers/TstatobevandesController');


// lettura tutti gli utenti
router.get('/', tstatobevande.getAll);
// lettura singolo utente
router.get('/:id', tstatobevande.getbyid);
// creazione nuovo utente
router.post('/create', tstatobevande.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', tstatobevande.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', tstatobevande.delete);

// lettura ultimo id
router.get('/lastid', tstatobevande.getLastId);

module.exports = router;