// tabella t_statos  -  stato users  
const express = require('express');
const router = express.Router();

const tstatocommanda = require('../controllers/TstatocommandasController');


// lettura tutti gli utenti
router.get('/', tstatocommanda.getAll);
// lettura singolo utente
router.get('/:id', tstatocommanda.getbyid);
// creazione nuovo utente
router.post('/create', tstatocommanda.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', tstatocommanda.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', tstatocommanda.delete);

// lettura ultimo id
router.get('/lastid', tstatocommanda.getLastId);

module.exports = router;