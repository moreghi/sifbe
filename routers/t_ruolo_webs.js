const express = require('express');
const router = express.Router();

const truolowebs = require('../controllers/TruolowebsController');


// lettura tutti gli utenti
router.get('/', truolowebs.getAll);
// lettura singolo utente
router.get('/:id', truolowebs.getbyid);
// creazione nuovo utente
router.post('/create', truolowebs.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', truolowebs.updatebyid);
// cancellazione utente
router.delete('/deletebyid/:id', truolowebs.deletebyid);




module.exports = router;