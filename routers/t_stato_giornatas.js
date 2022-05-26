// tabella t_statos  -  stato users  
const express = require('express');
const router = express.Router();

const tstatogiornata = require('../controllers/TstatogiornatasController');


// lettura tutti gli utenti
router.get('/', tstatogiornata.getAll);
// lettura singolo utente
router.get('/:id', tstatogiornata.getbyid);
// creazione nuovo utente
router.post('/create', tstatogiornata.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', tstatogiornata.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', tstatogiornata.delete);

// lettura ultimo id
router.get('/lastid', tstatogiornata.getLastId);

module.exports = router;