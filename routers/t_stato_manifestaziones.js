// tabella t_statos  -  stato users  
const express = require('express');
const router = express.Router();

const tstatomanif = require('../controllers/TstatomanifestazionesController');


// lettura tutti gli utenti
router.get('/', tstatomanif.getAll);
// lettura singolo utente
router.get('/:id', tstatomanif.getbyid);
// creazione nuovo utente
router.post('/create', tstatomanif.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', tstatomanif.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', tstatomanif.delete);




module.exports = router;