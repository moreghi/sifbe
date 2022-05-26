const express = require('express');
const router = express.Router();
const authjwt  = require('../middleware/authJwt');
const truolowebs = require('../controllers/TruolowebsController');

// lettura tutti gli utenti
router.get('/', [authjwt.verifyToken], truolowebs.getAll);
// lettura singolo utente
router.get('/:id', [authjwt.verifyToken], truolowebs.getbyid);
// creazione nuovo utente
router.post('/create', [authjwt.verifyToken], truolowebs.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', [authjwt.verifyToken], truolowebs.updatebyid);
// cancellazione utente
router.delete('/deletebyid/:id', [authjwt.verifyToken], truolowebs.deletebyid);

module.exports = router;

