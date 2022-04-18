const express = require('express');
const router = express.Router();

const tsettores = require('../controllers/TsettoresController');


// lettura tutti gli utenti
router.get('/', tsettores.getAll);
// lettura singolo utente
router.get('/:id', tsettores.getbyid);
// creazione nuovo utente
router.post('/create', tsettores.createNew);
// aggiornamento utente
router.put('/updatebyid/:id', tsettores.updateByid);
// cancellazione utente
router.delete('/deletebyid/:id', tsettores.delete);




module.exports = router;