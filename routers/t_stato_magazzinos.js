// tabella t_statos  -  stato users  
const express = require('express');
const router = express.Router();

const tstatolavorazione = require('../controllers/TstatomagazzinosController');


// lettura tutti gli utenti
router.get('/', tstatolavorazione.getAll);
// lettura singolo utente
router.get('/:id', tstatolavorazione.getbyid);
// creazione nuovo utente
router.post('/create', tstatolavorazione.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', tstatolavorazione.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', tstatolavorazione.delete);

// lettura ultimo id
router.get('/lastid', tstatolavorazione.getLastId);

module.exports = router;