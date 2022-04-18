// tabella t_statos  -  stato users  
const express = require('express');
const router = express.Router();

const tstatos = require('../controllers/TstatospesasController');


// lettura tutti gli utenti
router.get('/', tstatos.getAll);
// lettura singolo utente
router.get('/:id', tstatos.getbyid);
// creazione nuovo utente
router.post('/create', tstatos.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', tstatos.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', tstatos.delete);

// lettura ultimo id
router.get('/lastid', tstatos.getLastId);

// lettura singolo utente
router.get('/tipo/:tipo', tstatos.getAllbyTipo);

module.exports = router;