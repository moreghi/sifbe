// tabella t_statos  -  stato users  
const express = require('express');
const router = express.Router();

const tstatoprenotaziones = require('../controllers/TstatoprenotazionesController');


// lettura tutti gli utenti
router.get('/', tstatoprenotaziones.getAll);
// lettura singolo utente
router.get('/:id', tstatoprenotaziones.getbyid);
// creazione nuovo utente
router.post('/create', tstatoprenotaziones.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', tstatoprenotaziones.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', tstatoprenotaziones.delete);

// lettura ultimo id
router.get('/lastid', tstatoprenotaziones.getLastId);

module.exports = router;