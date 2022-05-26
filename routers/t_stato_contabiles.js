// tabella t_statos  -  stato users  
const express = require('express');
const router = express.Router();

const tstatocontabile = require('../controllers/TstatocontabilesController');


// lettura tutti gli utenti
router.get('/', tstatocontabile.getAll);
// lettura singolo utente
router.get('/:id', tstatocontabile.getbyid);
// creazione nuovo utente
router.post('/create', tstatocontabile.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', tstatocontabile.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', tstatocontabile.delete);

// lettura ultimo id
router.get('/lastid', tstatocontabile.getLastId);

module.exports = router;